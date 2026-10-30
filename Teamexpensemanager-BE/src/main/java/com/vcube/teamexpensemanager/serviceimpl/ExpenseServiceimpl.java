package com.vcube.teamexpensemanager.serviceimpl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.vcube.teamexpensemanager.dto.ExpenseRequest;
import com.vcube.teamexpensemanager.entity.Event;
import com.vcube.teamexpensemanager.entity.Expense;
import com.vcube.teamexpensemanager.entity.User;
import com.vcube.teamexpensemanager.exceptions.ResourceNotFoundException;
import com.vcube.teamexpensemanager.repository.EventRepository;
import com.vcube.teamexpensemanager.repository.ExpenseRepository;
import com.vcube.teamexpensemanager.repository.UserRepository;
import com.vcube.teamexpensemanager.service.ExpenseService;

@Service
public class ExpenseServiceimpl implements ExpenseService{
		
	@Autowired
	ExpenseRepository expenseRepository;
	@Autowired
	EventRepository eventRepository;
	@Autowired
	UserRepository userRepository;

	    public Expense createExpense(
	            ExpenseRequest request) {

	        Event event = eventRepository.findById(request.eventId())
	                .orElseThrow(() ->
	                        new ResourceNotFoundException(
	                                "Event with ID " +
	                                request.eventId() +
	                                " not found"
	                        )
	                );


	        User user = userRepository.findById(request.userId())
	                .orElseThrow(() ->
	                        new ResourceNotFoundException(
	                                "User with ID " +
	                                request.userId() +
	                                " not found"
	                        )
	                );


	        Expense expense = new Expense();

	        expense.setDescription(request.description());
	        expense.setAmount(request.amount());
	        expense.setCategory(request.category());
	        expense.setExpenseDate(request.expenseDate());
	        expense.setEvent(event);
	        expense.setPaidBy(user);

	        return expenseRepository.save(expense);
	    }


	    public List<Expense> getAllExpenses() {

	        return expenseRepository.findAll();
	    }


	    public Expense getExpenseById(Long id) {

	        return expenseRepository.findById(id)
	                .orElseThrow(() ->
	                        new ResourceNotFoundException(
	                                "Expense with ID " +
	                                id +
	                                " not found"
	                        )
	                );
	    }


	    public List<Expense> getExpensesByEvent(
	            Long eventId) {

	        if (!eventRepository.existsById(eventId)) {

	            throw new ResourceNotFoundException(
	                    "Event with ID " +
	                    eventId +
	                    " not found"
	            );
	        }

	        return expenseRepository.findByEventId(eventId);
	    }


	    public Expense updateExpense(
	            Long id,
	            ExpenseRequest request) {

	        Expense expense = getExpenseById(id);

	        Event event = eventRepository.findById(
	                request.eventId()
	        ).orElseThrow(() ->
	                new ResourceNotFoundException(
	                        "Event with ID " +
	                        request.eventId() +
	                        " not found"
	                )
	        );


	        User user = userRepository.findById(
	                request.userId()
	        ).orElseThrow(() ->
	                new ResourceNotFoundException(
	                        "User with ID " +
	                        request.userId() +
	                        " not found"
	                )
	        );


	        expense.setDescription(request.description());
	        expense.setAmount(request.amount());
	        expense.setCategory(request.category());
	        expense.setExpenseDate(request.expenseDate());
	        expense.setEvent(event);
	        expense.setPaidBy(user);

	        return expenseRepository.save(expense);
	    }


	    public void deleteExpense(Long id) {

	        Expense expense = getExpenseById(id);

	        expenseRepository.delete(expense);
	    }
	}


