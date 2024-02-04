package student_application_project.repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import student_application_project.model.Course;

public interface CourseRepo extends MongoRepository<Course, String>{

    
}
