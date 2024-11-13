// db/schema.cds
namespace mydb;

entity Embeddings {
    key ID : Integer;
    text   : String(500);
    embedding : String;  // Store the vector as a JSON string if direct arrays are unsupported
}
