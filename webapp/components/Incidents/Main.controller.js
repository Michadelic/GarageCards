sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/ws/WebSocket",
	"sap/ui/model/json/JSONModel",
	"./model/formatter",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator",
	"sap/m/MessageBox"
], function(Controller, WebSocket, JSONModel, formatter, Filter, FilterOperator, MessageBox) {
	"use strict";

	return Controller.extend("sap.ui.demo.basicTemplate.components.Incidents.Main", {

		formatter: formatter,

		onInit: function () {
			var oWS = new WebSocket("wss://em-consumer-active-jaguar.cfapps.us10.hana.ondemand.com/");
			oWS.attachMessage(function (oEvent) {
				// update list
				this.getView().getModel().refresh();
			}.bind(this));
		},

		onFilter: function (oEvent) {
			// build filter array
			var aFilter = [];
			var sQuery = oEvent.getParameter("newValue");
			if (sQuery) {
				aFilter.push(new Filter("title", FilterOperator.Contains, sQuery));
			}

			// filter binding
			var oList = this.byId("listID");
			var oBinding = oList.getBinding("items");
			oBinding.filter(aFilter);
		},

		toIncident: function (oEvent) {
			var oData = {id: oEvent.getSource().getBindingContext().getProperty("ID")};
			var oEventBus = sap.ui.getCore().getEventBus();
			oEventBus.publish("Incidents", "ShowDetails", oData);
		}
	});
});