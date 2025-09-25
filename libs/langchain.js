/*
var { OpenAI } = require("langchain");
var { loadQARefineChain } = require("langchain/chains");
var { TextLoader } = require("langchain/document_loaders/fs/text");
var { MemoryVectorStore } = require("langchain/vectorstores/memory");
var { OpenAIEmbeddings } = require("langchain/embeddings/openai");

const openai = new OpenAI({
  openAIApiKey: secretConfig.OPENAI_API_KEY,
  temperature: 0
});

const chain = loadQARefineChain(openai);

const embeddings = new OpenAIEmbeddings({
  openAIApiKey: secretConfig.OPENAI_API_KEY,
});

async function getChatResponse(question) {
  var data = await getAllDataJSON();
  var filename = path.join(__dirname, 'exported_data', 'data.json')
  fs.writeFileSync(filename, data);

  const loader = new TextLoader(filename);
  const docs = await loader.loadAndSplit();
  const store = await MemoryVectorStore.fromDocuments(docs, embeddings);

  const relevantDocs = await store.similaritySearch(question);

  const res = await chain.call({
    input_documents: relevantDocs,
    question,
  });

  return res.output_text;
}

module.exports = {
    getChatResponse,
    default: {
        getChatResponse
    }
};
*/