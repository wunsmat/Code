package edu.bvu.ds;

import java.util.ArrayList;
import java.util.Collections;
import java.util.LinkedList;
import java.util.List;
import java.util.Queue;

public class Graph {

	public List<Node> nodes = new ArrayList<Node>();
	
	public void breadthFirstTraversal(Node rootNode, Node endNode){
		for(Node node : nodes)
		{
			node.visited = false;
			node.distance=0;
			node.parent=null;
		}
		Queue <Node> q = new LinkedList<Node>();
		List <Node> a = new ArrayList<Node>();
		List <Node> b = new ArrayList<Node>();
		q.add(rootNode);
		a.add(rootNode);
		rootNode.parent = rootNode;
		rootNode.visited=true;
		Node n = null;
		while(n != endNode){
			n = (Node)q.poll();
			for(Node adj : n.adjacentNodes){
				if(!adj.visited){
					adj.visited=true;
					q.add(adj);
					a.add(adj);
					adj.parent = n;
					adj.distance = n.distance + 1;
				}
			}		
		}
		q.clear();
		for(Node node : a)
		{
			if(node != endNode)
			{
				b.add(node);
			}
			else
			{
				b.add(endNode);
				break;
			}
			//System.out.println(node.data + " " + node.distance + " " + node.parent.data);
		}
		Collections.reverse(b);
		Node path = b.get(0);

		while(path != rootNode)
		{
			q.add(path);
			path = path.parent;	
		}

		String sharedMovie = "";
	     System.out.println("");
		System.out.println("-------------------------" + q.peek().data.name + "-------------------------");
		System.out.println("\"" + q.peek().data.name + "\" has a bacon number of " + q.peek().distance);
		while(!q.isEmpty())
		{
			for(String movie : q.peek().data.movies)
			{
				if(q.peek().parent.data.movies.contains(movie))
				{
					sharedMovie = movie;
				}
			}
			System.out.println("\"" + q.peek().data.name + "\" was in (" + sharedMovie + ") with \"" + q.poll().parent.data.name + "\"");
		}
		System.out.println("--------------------------------------------------------------");
		a.clear();
		b.clear();
		q.clear();
	}
}