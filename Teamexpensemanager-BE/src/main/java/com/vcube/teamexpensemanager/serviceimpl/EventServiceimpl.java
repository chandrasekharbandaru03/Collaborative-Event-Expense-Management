package com.vcube.teamexpensemanager.serviceimpl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.vcube.teamexpensemanager.dto.EventRequest;
import com.vcube.teamexpensemanager.entity.Event;
import com.vcube.teamexpensemanager.entity.User;
import com.vcube.teamexpensemanager.exceptions.ResourceNotFoundException;
import com.vcube.teamexpensemanager.repository.EventRepository;
import com.vcube.teamexpensemanager.repository.UserRepository;
import com.vcube.teamexpensemanager.service.EventService;

@Service
public class EventServiceimpl implements EventService {
	@Autowired
	EventRepository eventRepository;
	@Autowired
	UserRepository userRepository;

	public Event createEvent(EventRequest request) {

		Event event = new Event();

		event.setEventName(request.eventName());
		event.setLocation(request.location());

		return eventRepository.save(event);
	}

	public List<Event> getAllEvents() {

		return eventRepository.findAll();
	}

	public Event getEventById(Long id) {

		return eventRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Event with ID " + id + " not found"));
	}

	public Event addMember(Long eventId, Long userId) {

		Event event = getEventById(eventId);

		User user = userRepository.findById(userId)
				.orElseThrow(() -> new ResourceNotFoundException("User with ID " + userId + " not found"));

		event.getMembers().add(user);

		user.getEvents().add(event);

		userRepository.save(user);

		return event;
	}

	public Event removeMember(Long eventId, Long userId) {

		Event event = getEventById(eventId);

		User user = userRepository.findById(userId)
				.orElseThrow(() -> new ResourceNotFoundException("User with ID " + userId + " not found"));

		event.getMembers().remove(user);

		user.getEvents().remove(event);
		
		userRepository.save(user);

		return event;
	}
}
