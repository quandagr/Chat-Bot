import prompt from "prompt-sync";
const input = prompt();
import dotenv from "dotenv";
dotenv.config();

const apiAccount = process.env.API_CLOUD_FARE_ACCOUNT;
const apiToken = process.env.API_CLOUD_FARE_TOKEN;
const apiModel = process.env.API_CLOUD_FARE_MODEL;

let info = "";

let message = [
    {
        role: "system",
        content: `You are a helpful AI Agent that helps people find information." Use the provided information to answer the question at the end. If the information does not contain the answer, respond with "I don't know."
        Here is the information:  "Top 10 Horror Movies of All Time: "Pull information from a credible source to list the top 10 horror movies of all time. Provide the titles, with any additional details or descriptions.
"
        1) "Insidious":
        2) "The Conjuring":
        3) "Hereditary":
        4) "A Quiet Place": 
        5) "Get Out":
        6) "The Babadook":
        7) "It Follows":
        8) "The Witch": 
        9) "Midsommar":
        10) "The Ring":`
    }

];

while (info !== "exit") {

    info = input("Enter your question (type 'exit' to quit): ")
    
    const msg = {
        role: "user",
        content: info
    };
    message.push(msg);

    const data = await run(apiModel, message);

    console.log("AI Response:", data.result.response);

}

async function run(model, messages) {
    const response = await fetch(`https://api.cloudflare.com/client/v4/accounts/${apiAccount}/ai/run/${model}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${apiToken}`
        },
        body: JSON.stringify({
            messages: messages
        })
    });
    const result = await response.json();
    return result;

}

