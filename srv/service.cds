
using mydb from '../db/schema';

service TextService {
    entity Embeddings as projection on mydb.Embeddings;
    
    action FindSimilarEmbeddings(inputEmbedding: String) returns array of Embeddings;
}
