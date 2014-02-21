#include <windows.h>

#define GLUT_DISABLE_ATEXIT_HACK
#include <GL/glut.h>
#include <GL/glu.h>
#include <GL/GL.h>
#include <stdlib.h>
#include <math.h>

#define _USE_MATH_DEFINES
#include <cmath>
#include <cstdlib>
#include <vector>
#include <iostream>
#include <ctime>

using namespace std;
//angle of rotation
float xpos = -2.0, ypos = 0.0, zpos = -2.0, xrot = 0, yrot = 0, angle=0.0;

//positions of the cubes
float positionz[144];
float positionx[144];
float spositionz = 0;
float spositionx = 0;

int level = 1;



int map1 [12][12] =                 { 0,0,0,0,0,0,0,0,0,0,0,0,
                                      0,1,1,1,1,1,0,1,1,1,1,0,
                                      0,0,1,0,0,1,0,0,0,1,0,0,
                                      0,1,1,1,0,1,0,1,1,1,1,0,
                                      0,1,1,1,0,1,1,1,1,1,1,0,
                                      0,1,1,1,1,1,0,1,1,1,1,0,
                                      0,0,0,1,1,1,0,1,1,1,1,0,
                                      0,1,1,1,1,1,1,1,1,1,1,0,
                                      0,0,0,1,0,0,0,1,1,1,1,0,
                                      0,1,1,1,1,1,0,1,1,1,1,0,
                                      0,1,1,1,1,1,0,1,1,1,2,0,
                                      0,0,0,0,0,0,0,0,0,0,0,0 };


int map2 [12][12] =                 { 1,1,0,0,0,0,0,0,0,0,0,0,
                                      0,2,1,1,1,1,0,1,1,0,1,0,
                                      0,0,0,0,0,1,0,1,1,0,1,0,
                                      0,1,1,1,0,1,0,1,1,1,1,0,
                                      0,1,1,1,0,1,0,1,1,1,1,0,
                                      0,1,1,1,1,1,0,1,1,1,1,0,
                                      0,0,0,0,0,1,0,1,1,1,1,0,
                                      0,1,1,1,1,1,1,1,1,1,1,0,
                                      0,0,0,0,0,0,0,1,0,0,1,0,
                                      0,1,1,1,1,1,0,1,0,1,1,0,
                                      0,1,1,1,1,1,0,1,0,1,1,0,
                                      0,0,0,0,0,0,0,0,0,0,0,0 };


int map3 [12][12] =                 { 0,0,0,0,0,0,0,0,0,0,0,0,
                                      0,1,1,1,1,1,1,1,1,1,1,0,
                                      0,0,0,0,0,0,1,0,0,0,1,0,
                                      0,1,1,1,1,0,1,0,1,0,1,0,
                                      0,0,1,0,1,0,1,0,1,0,1,0,
                                      0,0,1,0,1,0,0,0,1,0,1,0,
                                      0,0,1,0,1,1,1,1,1,0,1,0,
                                      0,0,1,0,0,0,0,0,0,0,1,0,
                                      0,0,1,1,1,1,1,1,1,1,1,0,
                                      0,0,0,0,0,0,0,0,0,0,1,0,
                                      0,2,1,1,1,1,1,1,1,1,1,0,
                                      0,0,0,0,0,0,0,0,0,0,0,0 };






void cubepositions (void) { //set the positions of the cubes
      int x = 0;

	  if(level > 3)
	  {
		  cout << "You win!" << endl;
		exit(0);
	  }
	if(level == 1)
	{
      for(int i = 0; i < 12; i++)
            {
      for(int h = 0; h < 12; h++)
            {
                  if(map1[i][h] == 0) 
                  {
                        //draw a wall
                        positionz[x] = h * 0.2;
                        positionx[x] = i * 0.2;
						x++;
                  }
                  else if(map1[i][h] == 1)
                  {
                        //empty space

                  }
                  else if(map1[i][h] == 2) 
                  {
                        //draw some stairs
						spositionz = h * 0.2;
						spositionx = i * 0.2;

                  }

            }
      }
	}
	else if(level == 2)
	{
      for(int i = 0; i < 12; i++)
            {
      for(int h = 0; h < 12; h++)
            {
                  if(map2[i][h] == 0) 
                  {
                        //draw a wall
                        positionz[x] = h * 0.2;
                        positionx[x] = i * 0.2;
						x++;
                  }
                  else if(map2[i][h] == 1)
                  {
                        //empty space

                  }
                  else if(map2[i][h] == 2) 
                  {
                        //draw some stairs
						spositionz = h * 0.2;
						spositionx = i * 0.2;

                  }

            }
      }
	}
	else if(level == 3)
	{
      for(int i = 0; i < 12; i++)
            {
      for(int h = 0; h < 12; h++)
            {
                  if(map3[i][h] == 0) 
                  {
                        //draw a wall
                        positionz[x] = h * 0.2;
                        positionx[x] = i * 0.2;
						x++;
                  }
                  else if(map3[i][h] == 1)
                  {
                        //empty space

                  }
                  else if(map3[i][h] == 2) 
                  {
                        //draw some stairs
						spositionz = h * 0.2;
						spositionx = i * 0.2;

                  }

            }
      }
	}
}

//draw the cube
void cube (void) {
    for (int i=0;i<144;i++)
    {
        glPushMatrix();
        glTranslated(-positionx[i + 1] * 10, 0, -positionz[i + 1] *
                     10); //translate the cube
        glutSolidCube(2); //draw the cube
        glPopMatrix();
    }
}

void stairs (void) {
        glPushMatrix();
        glTranslated(-spositionx * 10, 0, -spositionz *
                     10); //translate the cube
        glutSolidCube(1); //draw the cube
        glPopMatrix();
}

void init (void) {
    cubepositions();
}

void enable (void) {
    glEnable (GL_DEPTH_TEST); //enable the depth testing
    glEnable (GL_LIGHTING); //enable the lighting
    glEnable (GL_LIGHT0); //enable LIGHT0, our Diffuse Light
    glShadeModel (GL_SMOOTH); //set the shader to smooth shader
   
}

void camera (void) {
    glRotatef(xrot,1.0,0.0,0.0);  //rotate our camera on the x-axis (left and right)
    glRotatef(yrot,0.0,1.0,0.0);  //rotate our camera on the y-axis (up and down)
    glTranslated(-xpos,-ypos,-zpos); //translate the screen to the position of our camera
}

void display (void) {
    glClearColor (0.0,0.0,0.0,1.0); //clear the screen to black
    glClear (GL_COLOR_BUFFER_BIT | GL_DEPTH_BUFFER_BIT); //clear the color buffer and the depth buffer

    glLoadIdentity();

    camera();
    enable();
    cube(); //call the cube drawing function
	stairs();
    glutSwapBuffers(); //swap the buffers
    angle++; //increase the angle
}

void reshape (int w, int h) {
    glViewport (0, 0, (GLsizei)w, (GLsizei)h); //set the viewport to the current window specifications
    glMatrixMode (GL_PROJECTION); //set the matrix to projection
      GLfloat specular[] = {1.0f, 1.0f, 1.0f , 1.0f};
      glLightfv(GL_LIGHT0, GL_SPECULAR, specular);
      GLfloat ambient[] = { 1.0f, 1.0f, 1.0f };
      glLightfv(GL_LIGHT0, GL_AMBIENT, ambient);
      GLfloat position[] = { xpos, 5.0f, zpos, 1.0f };
      glLightfv(GL_LIGHT0, GL_POSITION, position);
    glLoadIdentity ();
    gluPerspective (60, (GLfloat)w / (GLfloat)h, 1.0, 1000.0
                    ); //set the perspective (angle of sight, width, height, ,depth)
    glMatrixMode (GL_MODELVIEW); //set the matrix back to model
   
}

void keyboard (unsigned char key, int x, int y) {
    if (key=='q')
    {
        xrot += 90;
        if (xrot >360) xrot -= 360;
    }
   
    if (key=='z')
    {
        xrot -= 90;
        if (xrot < -360) xrot += 360;
    }
   
    if (key=='w')
    {
            float xrotrad, yrotrad;
            yrotrad = (yrot / 180 * 3.141592654f);
			xrotrad = (xrot / 180 * 3.141592654f);
            float newxpos = xpos + float(sin(yrotrad)) ;
            float newzpos =zpos - float(cos(yrotrad)) ;  
			//helps detect collisions later 
			bool collision = false;
            
            
            //check to see if they hit a wall here 
            for(int k = 0; k<144; k++)
            {
                  float x1 = -positionx[k]*10;
                  float x2 = x1 + 1;
                  float z1 = -positionz[k]*10;
                  float z2 = z1 + 1;
				  float sx1 = -spositionx *10 - 0.5;
				  float sx2 = sx1 + 2;
				  float sz1 = -spositionz *10 - 0.5;
				  float sz2 = sz1 + 2;
			
                  if(x1 <= newxpos && newxpos <= x2 && z1 <=newzpos && newzpos <= z2)
                  {

                        collision = true;
                        cout<<"ouch"<<endl;
                  }
				  else if(sx1 <= newxpos && newxpos <= sx2 && sz1 <=newzpos && newzpos <= sz2)
				  {
					    yrot += 180;
						if (yrot >360) yrot -= 360;
						level++;
						cubepositions();
						cout << level << endl;
				  }
            }
            if(collision == false) 
            {
                  
                        xpos = newxpos;//+= float(sin(yrotrad)) ;
                        zpos = newzpos;//-= float(cos(yrotrad)) ;
                        cout << "Now at " << xpos << "," << zpos << endl;
                        ypos -= float(sin(xrotrad)) ;
            }
}
   
    if (key=='s')
   {
        yrot += 180;
        if (yrot >360) yrot -= 360;
    }
   
    if (key=='d')
    {
        yrot += 90;
        if (yrot >360) yrot -= 360;
    }
   
    if (key=='a')
    {
        yrot -= 90;
        if (yrot < -360)yrot += 360;
    }
    if (key==27)
    {
        exit(0);
    }
}

int main (int argc, char **argv) {
    glutInit (&argc, argv);
    glutInitDisplayMode (GLUT_DOUBLE | GLUT_DEPTH); //set the display to Double buffer, with depth
    glutInitWindowSize (500, 500); //set the window size
    glutInitWindowPosition (100, 100); //set the position of the window
    glutCreateWindow ("A basic OpenGL Window"); //the caption of the window
    init (); //call the init function
    glutDisplayFunc (display); //use the display function to draw everything
    glutIdleFunc (display); //update any variables in display, display can be changed to anyhing, as long as you move the variables to be updated, in this case, angle++;
    glutReshapeFunc (reshape); //reshape the window accordingly
    glutKeyboardFunc (keyboard); //check the keyboard
    glutMainLoop (); //call the main loop
    return 0;
}
