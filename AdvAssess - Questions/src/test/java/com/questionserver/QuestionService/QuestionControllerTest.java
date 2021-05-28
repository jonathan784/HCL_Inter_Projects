package com.questionserver.QuestionService;

import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;
import java.util.ArrayList;
import java.util.List;
import org.junit.jupiter.api.BeforeEach;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.mockito.junit.MockitoJUnitRunner;


@RunWith(MockitoJUnitRunner.class)
class QuestionControllerTest {

    @Mock
    QuestionRepository questionRepository;

    @InjectMocks
    QuestionController questionController;

    String[] fakeStringArray = null;

    Question testQuestion1 = new Question("fakeID1","fakeQuestion1", "fakeResponse11", "fakeResponse12", "fakeResponse13", "fakeResponse14", "fakeSelection1", "fakeAssessmenType1", "fakeCategory1", "fakeSubCategory1");
    Question testQuestion2 = new Question("fakeID2","fakeQuestion2", "fakeResponse22", "fakeResponse22", "fakeResponse23", "fakeResponse24", "fakeSelection2", "fakeAssessmenType2", "fakeCategory2", "fakeSubCategory2");



    @BeforeEach
    public void setup() throws Exception {
        MockitoAnnotations.openMocks(this);
    }


    @Test
    void getAllQuestions() {

        List<Question> testList = new ArrayList<Question>();
        testList.add(testQuestion1);
        System.out.println(testList);
        when(questionRepository.findAll()).thenReturn(testList);
        List<Question> result = questionController.getAllQuestions();
        System.out.println(result);
        assertEquals(testList, result);
    }

    @Test
    void insertQuestion() {

        List<Question> testList = new ArrayList<Question>();
        testList.add(testQuestion1);
        testList.add(testQuestion2);
        when(questionRepository.findAll()).thenReturn(testList);
        questionController.insertQuestion(testQuestion1);
        questionController.insertQuestion(testQuestion2);
        List<Question> result = questionController.getAllQuestions();
        assertEquals(testList, result);
    }
}