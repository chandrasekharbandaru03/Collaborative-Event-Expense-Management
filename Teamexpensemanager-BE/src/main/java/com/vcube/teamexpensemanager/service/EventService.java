package com.vcube.teamexpensemanager.service;

import java.util.List;

import com.vcube.teamexpensemanager.dto.EventRequest;
import com.vcube.teamexpensemanager.entity.Event;

public interface EventService {
	Event createEvent(EventRequest request);

	List<Event> getAllEvents();

	Event getEventById(Long id);

	public Event addMember( Long eventId, Long userId);
	Event removeMember(Long eventId, Long userId);

}
