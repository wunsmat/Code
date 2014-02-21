package edu.bvu.ds;

import java.io.File;
import java.io.FileNotFoundException;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Scanner;
/////////////////////
////Matt Wunschel///
//The Bacon Finder//
//////////////////////////////////////////////////////
///This program cannot be used to find actual bacon///
//////////////////////////////////////////////////////

//fixme Need to add UI after I finish with UI class.
public class baconfinder {
	public static void P(String p){
		System.out.println(p);
	}

	public static void main(String[] args) throws FileNotFoundException {
		// Extract all the data out of "bacon_data.txt"
		//From ------------------------------------------------------Here
		File f = new File("bacon_data.txt");
		ArrayList<Actor> actors = new ArrayList<Actor>();
		int aSize = 0;
		int aIndex = 0;
		String name = "";
		String movie = "";
		boolean done = false;
		Scanner fin = new Scanner(f); 
		while (fin.hasNextLine())
		{
			String word = fin.nextLine();
			// If the text file starts with 'A: ', create a new Actor
			// and add the actor to the array list of actors
			if(word.startsWith("A: "))
			{
				name = word.substring(3);
				boolean exists = false;
				for(int x = 0; x < aSize; x++)
				{
					if(name.equals(actors.get(x).name))
					{
						aIndex = x;
						exists = true;
						break;
					}
				}
				if(!exists)
				{
					actors.add(new Actor(name));
					aIndex = aSize;
					aSize++;	
				}

				// Assign the movies to the Actor.
				movie = fin.nextLine();
				while(!movie.isEmpty() && !done)
				{
					actors.get(aIndex).addMovie(movie);
					if(fin.hasNextLine())
					{
					movie = fin.nextLine();
					}
					else
					{
						done = true;
					}
				}
				
			}
			if(word.startsWith("M: "))
			{
				movie = word.substring(3);
				name = fin.nextLine();
				String compare = "";
				while(!name.isEmpty() && !done)
				{
					boolean exists = false;
						// Check if actor already exists and add movie to
						// actors[x] if they do.
						for(int x = 0; x < aSize; x++)
						{
							compare = actors.get(x).name;
							if(name.equals(compare))
							{
									actors.get(x).addMovie(movie);
									if(fin.hasNextLine())
									{
										name = fin.nextLine();
										exists = true;
									}
									else
									{
										exists = true;
										done = true;
									}
							}
						}
						// If actor doesn't exists create new Actor and
						// add them to actors[x] and add movie to them.
						if(!exists)
						{
							actors.add(new Actor(name));
							actors.get(aSize).addMovie(movie);
							aSize++;
							if(fin.hasNextLine())
							{
								name = fin.nextLine();
							}
							else
							{
								done = true;
							}

						}
					}
			}
		}
		// To---------------------------------------------------Here
		ArrayList<String> mList = new ArrayList<String>();
		ArrayList<String> aMovies = new ArrayList<String>();
		ArrayList<Node> aNodes = new ArrayList<Node>();
		for(Actor actor : actors)
		{
			Collections.sort(actor.movies);
			actor.removeDuplicates(actor.movies);
			aMovies = actor.movies;
			for(String aMovie : aMovies)
			{
				if(!mList.contains(aMovie))
				{
					mList.add(aMovie);
				}
			}
			aNodes.add(new Node(actor));
		}
		Collections.sort(mList);
		// Start finding the bacon number
		

		Graph g = new Graph();
		for(Node aNode : aNodes)
		{
		g.nodes.add(aNode);
		}
		// Scan through each movie to see which actors are connected

		for(String m : mList)
		{
			for(Node aNode: aNodes)
			{
				if(aNode.data.movies.contains(m))
				{
					for(Node aNode1 : aNodes)
					{
						if(aNode != aNode1 && aNode1.data.movies.contains(m))
						{
							aNode.addAdjacentNode(aNode1);
						}
					}
				}
			}
		}
	    for(Actor actor : actors)
	    {
	    	System.out.print("(" + actor.name + ") ");
	    }
	    Scanner sc = new Scanner(System.in);
	     String i = "";
	     while(!i.equals("quit"))
	     {
    	P("");
	    System.out.print("Enter an actor/actress (enter “quit” to end the program): ");
	    i = sc.nextLine();
	    for(Node aNode : aNodes)
	    {
	    	if(i.equals(aNode.data.name) && !i.equals("Bacon, Kevin"))
	    	{
	    		g.breadthFirstTraversal(aNodes.get(0), aNode);
	    	}
	    	if(i.equals("Bacon, Kevin"))
	    	{
	    		System.out.println("-------------------------*KEVIN BACON*---------------------------");
	    		System.out.println("Kevin Bacon is Kevin Bacon has been in all of Kevin Bacons movies");
	    		System.out.println("           Kevin Bacon's bacon number is OVER 9000!");
	    		System.out.println("-----------------------------------------------------------------");
	    		break;
	    	}
	     }
	}
	}
}
