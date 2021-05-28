package com.userserver.mongo1;


import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;
import java.util.ArrayList;
import java.util.List;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.mockito.junit.MockitoJUnitRunner;



@RunWith(MockitoJUnitRunner.class)
public class UserControllerTest {

    @Mock
    AuthService authservice;

    @Mock
    UserRepository testRepository;

    @Mock
    SaveUserService saveUserService;

    @InjectMocks
    UserController userController;

    String[] array = null;

    User testUser1 = new User("fakeEmail1@gmail.com", "fakeName1", "fakePassword1", "fakeRole1", "fakeStatus1", array);
    User testUser2 = new User("fakeEmail2@gmail.com", "fakeName2", "fakePassword2", "fakeRole2", "fakeStatus2", array);



    @BeforeEach
    public void setup() throws Exception {
        MockitoAnnotations.openMocks(this);
    }

    //double result = calc.add(2, 4);
    @Test
    public void TestGetUser() {
        List<User> testList = new ArrayList<User>();
        testList.add(testUser1);
        when(testRepository.findAll()).thenReturn(testList);
        List<User> result = userController.getUsers();
        System.out.println(testList);
        System.out.println(result);
        assertEquals(testList, result);

    }


    @Test
    public void testdeleteall() {
        List<User> testList = new ArrayList<User>();
        testList.add(testUser1);
    
      assertEquals("All users delete.",userController.deleteAllUsers());
    }

    @Test
    public void testdeleteUser() {

        List<User> testList = new ArrayList<User>();
        testList.add(testUser1);
       assertEquals("user deleted with id : testList", userController.deleteUser("testList"));
    }


    @Test
    public void FindUserByUserEmail() {

        when(testRepository.findByUserEmail("fakeEmail1@gmail.com")).thenReturn(testUser1);
        assertEquals(testUser1, testRepository.findByUserEmail("fakeEmail1@gmail.com"));
    }

    @Test
    public void TestSaveUser() {
        List<User> testList = new ArrayList<User>();
        testList.add(testUser1);
        testList.add(testUser2);
        when(testRepository.findAll()).thenReturn(testList);
        userController.saveUser(testUser1);
        userController.saveUser(testUser2);
        List<User> result = userController.getUsers();
        assertEquals(testList, result);

    }


   @Test
   public void TestauthenticateUser(){
        when(authservice.authenticateUser(testUser1)).thenReturn("true");
        assertEquals("true", userController.authenticateUser(testUser1));
   }
}