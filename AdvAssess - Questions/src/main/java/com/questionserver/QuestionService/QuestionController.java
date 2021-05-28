package com.questionserver.QuestionService;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api")
public class QuestionController {

    @Autowired
    QuestionRepository questionRepository;

    @GetMapping("/getAllQuestions")
    public List<Question> getAllQuestions() {
        return questionRepository.findAll();
    }

    @PostMapping("/insertQuestion")
    public String insertQuestion(@RequestBody Question question) {

        //creating a persistent question
        Question persistentQuestion = new Question();

        //map passed object to this persistent object
        persistentQuestion = question;
        questionRepository.save(persistentQuestion);
        return "Question added.";
    }

    @DeleteMapping("/deleteAllQuestions")
    public String deleteAllQuestions(){
        questionRepository.deleteAll();
        return "All questions deleted";
    }

    //Returns all of a particular user's assessments by querying the database against their userEmail that is assigned to their assessment
    @PostMapping(value = "/returnAllByAssessmentType", produces={"application/json"})
    public List<Question> getAllByAssessmentType(@RequestBody Question theAssessmentObject)
    {
        //creating a persistent question
        Question persistentAssessmentObject = new Question();

        //map passed object to this persistent object
        persistentAssessmentObject = theAssessmentObject;
        String assessmentType = persistentAssessmentObject.getAssessmentType();
        return questionRepository.findAllByAssessmentType(assessmentType);
    }



}
