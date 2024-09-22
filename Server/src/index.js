export default {
	async fetch(request, env) {
		if (request.method === 'OPTIONS') {
			return new Response(null, {
				status: 204,
				headers: {
					'Access-Control-Allow-Origin': '*',
					'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
					'Access-Control-Allow-Headers': 'Content-Type',
				},
			});
		}

		if (request.method === 'POST') {
			try {
				const { quiz } = await request.json();
				if (typeof quiz !== 'string' || quiz.trim() === '') {
					return new Response(JSON.stringify({ error: 'Prompt must be a non-empty string.' }), {
						status: 400,
						headers: { 'Access-Control-Allow-Origin': '*' },
					});
				}

				const messages = [
					{
						role: 'system',
						content: `You are an AI that generates multiple choice questions (MCQs) based on the provided topic or prompt. Generate exactly 6 MCQs in JSON format. Each MCQ should have an id, question, options (array of 4 strings), and correctAnswer. Ensure all responses are complete and do not exceed character limits. Respond with only valid JSON, without any additional text or explanation.`,
					},
					{
						role: 'user',
						content: `Topic or Prompt: ${quiz}`,
					},
				];

				const aiResponse = await env.AI.run('@cf/mistral/mistral-7b-instruct-v0.1', {
					prompt: JSON.stringify(messages),
					raw: true,
					stream: false,
				});

				let responseText = aiResponse.response.trim();
				console.log('Raw AI Response:', responseText);

				// Attempt to extract JSON from the response
				const jsonMatch = responseText.match(/\[[\s\S]*\]/);
				if (!jsonMatch) {
					throw new Error('No valid JSON found in the AI response.');
				}

				responseText = jsonMatch[0];

				let mcqData;
				try {
					mcqData = JSON.parse(responseText);
				} catch (jsonError) {
					console.error('Error parsing JSON:', jsonError);
					throw new Error('Malformed JSON response from AI.');
				}

				// Validate and fix each MCQ's structure
				const validateAndFixMCQ = (mcq, index) => {
					const fixedMCQ = {
						id: typeof mcq.id === 'number' ? mcq.id : index + 1,
						question: typeof mcq.question === 'string' ? mcq.question : `Question ${index + 1}`,
						options: Array.isArray(mcq.options) && mcq.options.length >= 4
							? mcq.options.slice(0, 4)
							: ['Option A', 'Option B', 'Option C', 'Option D'],
						correctAnswer: typeof mcq.correctAnswer === 'string' ? mcq.correctAnswer : mcq.options[0] || 'Option A'
					};
					return fixedMCQ;
				};

				// Ensure we have exactly 6 MCQs
				mcqData = mcqData.slice(0, 6).map(validateAndFixMCQ);

				// If we have less than 6 MCQs, pad the array with dummy questions
				while (mcqData.length < 6) {
					mcqData.push({
						id: mcqData.length + 1,
						question: `Placeholder question ${mcqData.length + 1}`,
						options: ['Option A', 'Option B', 'Option C', 'Option D'],
						correctAnswer: 'Option A'
					});
				}

				return new Response(JSON.stringify(mcqData), {
					headers: {
						'Content-Type': 'application/json',
						'Access-Control-Allow-Origin': '*',
					},
				});
			} catch (error) {
				console.error('Request Handling Error:', error.message);
				return new Response(JSON.stringify({
					error: 'An error occurred while processing your request.',
					details: error.message
				}), {
					status: 500,
					headers: {
						'Content-Type': 'application/json',
						'Access-Control-Allow-Origin': '*'
					},
				});
			}
		}

		return new Response('Invalid request method.', {
			status: 405,
			headers: { 'Access-Control-Allow-Origin': '*' },
		});
	},
};