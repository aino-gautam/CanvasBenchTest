package com.ainosoft.canvasBenchTest.client;

import com.ait.lienzo.client.core.event.NodeMouseClickEvent;
import com.ait.lienzo.client.core.event.NodeMouseClickHandler;
import com.ait.lienzo.client.core.shape.Circle;
import com.ait.lienzo.client.core.shape.Layer;
import com.ait.lienzo.client.core.shape.Rectangle;
import com.ait.lienzo.client.widget.LienzoPanel;
import com.ait.lienzo.shared.core.types.Color;
import com.ait.lienzo.shared.core.types.ColorName;
import com.google.gwt.user.client.Random;
import com.google.gwt.user.client.Window;

public class RectangleClickViewComponent extends LienzoPanel {
	
	public RectangleClickViewComponent() {
		drawCircles() ;
	}

	private LienzoPanel getLienzoPanel() {
		return this;
	}

	private int numShapes = 1000 ; 
	
	public void setNumShapes(int n) {
		numShapes = n ;	
	}
	
	public void drawRectangle(){
		
		final Layer layer = new Layer();

		int newXPosition = 0, positionX = 10;

		int newYPosition = 0, positionY = 10;

		int c = 0;

		for (int i = 1; i <= 50; i++) {
			for (int j = 1; j <= 50; j++) {
				final Rectangle rectangle = new Rectangle(12.5, 12.5);

				rectangle.setX(positionX + newXPosition).setY(positionY + newYPosition);

				final String bgcolor = Color.getRandomHexColor();

				c++;

				rectangle.setFillColor(bgcolor);

				try {
					layer.add(rectangle);
				} catch (Exception e) {
					Window.alert("OOPS " + c + " " + e.getMessage());

					return;
				}
				rectangle.addNodeMouseClickHandler(new NodeMouseClickHandler() {
					@Override
					public void onNodeMouseClick(NodeMouseClickEvent event) {
						getLienzoPanel().setBackgroundColor(bgcolor);
					}

				});
				newXPosition += 15;
			}
			newYPosition += 15;

			newXPosition = 0;
		}
		getLienzoPanel().setBackgroundColor(ColorName.WHITE);

		getLienzoPanel().add(layer);
	}

	final Layer layer = new Layer();

	public void drawCircles(){
		
		int c = 0;

		for (int i = 1; i <= numShapes; i++) {
			int x = Random.nextInt(500);
			int y = Random.nextInt(500);
				final Circle circle = new Circle(12.5);

				circle.setX(x).setY(y);

				final String bgcolor = Color.getRandomHexColor();

				c++;

				circle.setFillColor(bgcolor);

				try {
					layer.add(circle);
				} catch (Exception e) {
					Window.alert("OOPS " + c + " " + e.getMessage());

					return;
				}
				circle.addNodeMouseClickHandler(new NodeMouseClickHandler() {
					@Override
					public void onNodeMouseClick(NodeMouseClickEvent event) {
						getLienzoPanel().setBackgroundColor(bgcolor);
					}

				});
		}
		getLienzoPanel().setBackgroundColor(ColorName.WHITE);

		getLienzoPanel().add(layer);
		
	}

	public void reDraw() {
		if (layer != null)
			layer.clear();
		
		drawCircles() ;
		
	}
}