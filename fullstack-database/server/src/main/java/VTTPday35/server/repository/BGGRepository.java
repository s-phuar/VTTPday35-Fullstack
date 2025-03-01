package VTTPday35.server.repository;

import java.util.List;
import org.bson.Document;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Repository;

@Repository
public class BGGRepository {
    @Autowired
    private MongoTemplate template;

    
    /*

    db.games.find({
    "name": { $regex: "query", $options: "i" }
    })
    .sort({"name": 1})
    .limit(5)
    .projection({
        "_id":0,
        "name":1,
        "gid":1
    })

     */


    public List<Document> search(String q, int count){
        Criteria criteria = Criteria.where("name")
            .regex(q, "i");

        Query query = Query.query(criteria)
            .limit(count)
            .with(Sort.by(Sort.Direction.ASC, "name"));

        query.fields()
            .include("gid", "name")
            .exclude("_id");

        return template.find(query, Document.class, "games");

    }



    





}
