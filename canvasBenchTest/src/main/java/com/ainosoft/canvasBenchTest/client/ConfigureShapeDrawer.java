package com.ainosoft.canvasBenchTest.client;

import com.google.gwt.event.dom.client.ClickEvent;
import com.google.gwt.event.dom.client.ClickHandler;
import com.google.gwt.user.client.ui.Button;
import com.google.gwt.user.client.ui.Composite;
import com.google.gwt.user.client.ui.HorizontalPanel;
import com.google.gwt.user.client.ui.TextBox;

public class ConfigureShapeDrawer extends Composite implements ClickHandler {
	
	private HorizontalPanel configPanel = new HorizontalPanel() ;
	private TextBox shapeNumbers ; 
	private Button updateDrawer ; 
	private RectangleClickViewComponent destinationDrawer ;
	
	public ConfigureShapeDrawer(RectangleClickViewComponent drawer) {
		destinationDrawer = drawer ;
		shapeNumbers = new TextBox() ;
		updateDrawer = new Button("update Drawer") ;
		configPanel.add(shapeNumbers);
		configPanel.add(updateDrawer);
		updateDrawer.addClickHandler(this) ;
		shapeNumbers.setText("1000");
		initWidget(configPanel); 
	}

	@Override
	public void onClick(ClickEvent event) {
		
		int numShapes = Integer.parseInt(shapeNumbers.getText()) ; 
		destinationDrawer.setNumShapes(numShapes) ;
		destinationDrawer.reDraw() ;

	}
	

}
