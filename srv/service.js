// srv/service.js
const cds = require('@sap/cds');

module.exports = cds.service.impl(async function () {
    const { Embeddings } = this.entities;

    this.on('FindSimilarEmbeddings', async (req) => {
        const inputEmbedding = JSON.parse(req.data.inputEmbedding);

        // Fetch all embeddings from the database
        const embeddings = await cds.run(SELECT.from(Embeddings));

        // Calculate cosine similarity for each embedding and store it with ID
        const similarities = embeddings.map((entry) => {
            const embedding = JSON.parse(entry.embedding);
            return {
                ID: entry.ID,
                text: entry.text,
                similarity: cosineSimilarity(inputEmbedding, embedding),
            };
        });

        // Sort by similarity in descending order and return top results
        similarities.sort((a, b) => b.similarity - a.similarity);
        return similarities.slice(0, 10); // Return top 10 similar texts
    });
});

// Helper function to calculate cosine similarity
function cosineSimilarity(vec1, vec2) {
    const dotProduct = vec1.reduce((sum, val, i) => sum + val * vec2[i], 0);
    const magnitudeA = Math.sqrt(vec1.reduce((sum, val) => sum + val * val, 0));
    const magnitudeB = Math.sqrt(vec2.reduce((sum, val) => sum + val * val, 0));
    return dotProduct / (magnitudeA * magnitudeB);
}
