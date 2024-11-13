using mydb from '../db/schema';

service TextService {
    entity Embeddings as projection on mydb.Embeddings;
    
    action FindSimilarEmbeddings(inputEmbedding: LargeString) returns array of Embeddings;
}
