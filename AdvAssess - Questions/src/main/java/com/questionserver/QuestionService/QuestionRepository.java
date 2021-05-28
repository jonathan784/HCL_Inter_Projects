package com.questionserver.QuestionService;

import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface QuestionRepository extends MongoRepository<Question, Integer>{

    List<Question> findAllByAssessmentType(String assessmentType);


}
