package student_application_project.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import student_application_project.model.Students;

public interface StudentApplicationProjectRepo extends MongoRepository<Students, String> {
    @Query("{ 'email' : ?0 }")
    Students findByEmail(String email);
}
