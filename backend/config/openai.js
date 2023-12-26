const  {OpenAI} =require( "openai");

const openai = new OpenAI({apiKey:process.env.API_key});

async function generateChatCompletion(content) {
  try {
    const completion = await openai.chat.completions.create({
      
      messages: [{ role: 'user', content }],
      model: 'gpt-3.5-turbo',
    });
    // console.log(completion.choices[0].message.content)

    return completion.choices[0].message.content;
  } catch (error) {
    console.error('Error in generateChatCompletion:', error.message || error);
    throw error; // Re-throw the error for handling in the calling code if needed
  }
}

module.exports = { generateChatCompletion };
