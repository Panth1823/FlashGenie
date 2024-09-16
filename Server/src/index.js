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
						content: `You are an AI that generates multiple choice questions (MCQs) based on the provided topic. Generate exactly 6 MCQs in JSON format as follows:
                        [
                            {
                                "id": 1,
                                "question": "What is the question?",
                                "options": ["Option 1", "Option 2", "Option 3", "Option 4"],
                                "correctAnswer": "The correct answer"
                            },
                            ...
                        ]
                        Ensure all responses are complete and do not exceed character limits. Respond with only valid JSON, without any additional text or explanation.`,
					},
					{
						role: 'user',
						content: `Topic: ${quiz}`,
					},
				];

				const aiResponse = await env.AI.run('@cf/mistral/mistral-7b-instruct-v0.1', {
					prompt: JSON.stringify(messages),
					raw: true,
					stream: false,
				});

				let responseText = aiResponse.response.trim();
				console.log('Raw AI Response:', responseText);

				// Clean the response to remove any extraneous characters
				if (responseText.startsWith('}')) {
					responseText = responseText.slice(1); // Remove leading '}'
				}

				// Ensure the response is valid JSON
				if (responseText.startsWith('[') && responseText.endsWith(']')) {
					// It's already a valid JSON array
				} else {
					throw new Error('Malformed JSON response from AI.');
				}

				let mcqData;

				try {
					mcqData = JSON.parse(responseText);
				} catch (jsonError) {
					console.error('Error parsing JSON:', jsonError);
					throw new Error('Malformed JSON response from AI.');
				}

				// Validate each MCQ's structure
				const validateMCQ = (mcq) => {
					return (
						typeof mcq.id === 'number' &&
						typeof mcq.question === 'string' &&
						Array.isArray(mcq.options) &&
						mcq.options.length >= 2 && // At least 2 options
						typeof mcq.correctAnswer === 'string'
					);
				};

				// If we have less than 6 MCQs, pad the array with dummy questions
				while (mcqData.length < 6) {
					mcqData.push({
						id: mcqData.length + 1,
						question: "Placeholder question",
						options: ["Option 1", "Option 2", "Option 3", "Option 4"],
						correctAnswer: "Option 1"
					});
				}

				// Validate each MCQ's structure
				for (const mcq of mcqData) {
					if (!validateMCQ(mcq)) {
						throw new Error('Invalid MCQ structure detected.');
					}
				}

				return new Response(JSON.stringify(mcqData), {
					headers: {
						'Content-Type': 'application/json',
						'Access-Control-Allow-Origin': '*',
					},
				});
			} catch (error) {
				console.error('Request Handling Error:', error.message);
				return new Response(JSON.stringify({ error: error.message }), {
					status: 500,
					headers: { 'Access-Control-Allow-Origin': '*' },
				});
			}
		}

		return new Response('Invalid request method.', {
			status: 405,
			headers: { 'Access-Control-Allow-Origin': '*' },
		});
	},
};
