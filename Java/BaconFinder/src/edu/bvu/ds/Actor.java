package edu.bvu.ds;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.Set;

public class Actor {
	public String name;
	public ArrayList<String> movies = new ArrayList<String>();
public Actor(String name) {
		super();
		this.name = name;
	}
public void addMovie(String movie)
	{
	movies.add(movie);
	}
public void removeDuplicates(ArrayList<String> list) {
    int size = list.size();
    int out = 0;
    {
        final Set<String> encountered = new HashSet<String>();
        for (int in = 0; in < size; in++) {
            final String t = (String) list.get(in);
            final boolean first = encountered.add(t);
            if (first) {
                list.set(out++, t);
            }
        }
    }
    while (out < size) {
        list.remove(--size);
    }
}
}
