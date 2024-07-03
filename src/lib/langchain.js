import { ChatOpenAI } from "@langchain/openai";
import {
  ChatPromptTemplate,
  MessagesPlaceholder,
} from "@langchain/core/prompts";
import { createOpenAIFunctionsAgent, AgentExecutor } from "langchain/agents";
import { TavilySearchResults } from "@langchain/community/tools/tavily_search";
import { HumanMessage, AIMessage } from "@langchain/core/messages";

const model = new ChatOpenAI({
  openAIApiKey: import.meta.env.VITE_OPENAI_API_KEY,
  modelName: "gpt-3.5-turbo",
  temperature: 1,
});

export const buscar = async () => {
  const response = await model.invoke("traducir al inglés: 'Eres hermosa'");
  return response.content;
};

const prompt = ChatPromptTemplate.fromMessages([
  ("system", "You are a helpful assistant called Max"),
  new MessagesPlaceholder("chat_history"),
  ("human", "{input}"),
  new MessagesPlaceholder("agent_scratchpad"),
]);

const searchTool = new TavilySearchResults({
  apiKey: import.meta.env.VITE_TAVILY_API_KEY,
});

const tools = [searchTool];

const agent = await createOpenAIFunctionsAgent({
  llm: model,
  prompt,
  tools,
});

const agentExecutor = new AgentExecutor({
  agent,
  tools,
});

const chatHistory = [];

export const askQuestions = async (question) => {
  const response = await agentExecutor.invoke({
    input: question,
    chat_history: chatHistory,
  });

  chatHistory.push(new HumanMessage(question));
  chatHistory.push(new AIMessage(response.output));

  return chatHistory;
};
