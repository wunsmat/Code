package edu.bvu.ds;

import java.util.LinkedList;
import java.util.List;

public class Node {

	public Actor data; 
	public boolean visited=false; 
	public int distance = 0;
	public Node parent = null;
	public List<Node> adjacentNodes = new LinkedList<Node>(); 

	public Node(Actor actor){
		this.data = actor;
	}

	public void addAdjacentNode(final Node node){
		adjacentNodes.add(node);
		node.adjacentNodes.add(this);
	}
}

