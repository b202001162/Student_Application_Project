package student_application_project.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Optional;

import student_application_project.model.Course;
import student_application_project.repository.CourseRepo;

@RestController
public class CourseController {
    @Autowired
    private CourseRepo repo;

    @GetMapping("/courses")
    public ResponseEntity<?> getAllCourses() {
        List<Course> courses = repo.findAll();
        if (courses.size() == 0) {
            return new ResponseEntity<>("No Courses available", null, HttpStatus.NOT_FOUND);
        } else {
            return new ResponseEntity<List<Course>>(courses, null, HttpStatus.OK);
        }
    }

    @PostMapping("/addCourse")
    public ResponseEntity<?> addCourse(@RequestBody Course course) {
        try {
            repo.save(course);
            return new ResponseEntity<Course>(course, null, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), null, HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }

    @GetMapping("/course/{id}")
    public ResponseEntity<?> getSingleCourse(@PathVariable("id") String id) {
        try {
            Optional<Course> courseOptional = repo.findById(id);
            if (courseOptional.isPresent()) {
                return new ResponseEntity<>(courseOptional.get(), null, HttpStatus.OK);
            } else {
                return new ResponseEntity<>("No Course found with id: " + id, null, HttpStatus.NOT_FOUND);
            }
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


}
