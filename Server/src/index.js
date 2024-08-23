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
						role: "system",
						content: `You are an AI that generates flashcards based on the provided topic. Generate 6 flashcards in JSON format as follows:
						{
							"id": 1,
							"question": "What is the question?",
							"answer": "The answer"
						}
						Only provide the JSON data without any additional text or explanations.`
					},
					{
						role: "user",
						content: `Topic: ${quiz}`
					}
				];

				const aiResponse = await env.AI.run('@cf/mistral/mistral-7b-instruct-v0.1', {
					prompt: JSON.stringify(messages),
					raw: true,
					stream: false,
				});

				const responseText = aiResponse.response.trim();
				console.log('AI Response:', responseText);

				let flashcardsData;
				try {
					flashcardsData = JSON.parse(responseText);
				} catch (jsonError) {
					throw new Error('Response does not contain valid JSON.');
				}

				if (!Array.isArray(flashcardsData) || flashcardsData.length === 0) {
					throw new Error('Response JSON is not a valid array or is empty.');
				}

				return new Response(JSON.stringify(flashcardsData), {
					headers: {
						'Content-Type': 'application/json',
						'Access-Control-Allow-Origin': '*',
					},
				});
			} catch (error) {
				console.error('Request Handling Error:', error);
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
