sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
	"../model/formatter",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator"
], function (Controller, JSONModel, formatter, Filter, FilterOperator) {
	"use strict";

	return Controller.extend("com.garageseries.Incident_CF.controller.Home", {

		formatter: formatter,
		onInit: function () {
			var oModel = new JSONModel();
			var settings = {
				async: true,
				crossDomain: true,
				url: "/destinations/Incidents_CF/incident/SafetyIncidents?$expand=incidentPhotos,category,priority&$orderby=createdAt%20desc&$top=10",
				method: "GET",
				headers: {
					"content-type": "application/json",
					"APIKey": "OEg7evHR3qkgBZDjgAyo3HZl7guhkaGN1"
				},
				processData: false
			};

			$.ajax(settings).done(function (response) {
				oModel.setData(response.value);
			});
			sap.ui.getCore().setModel(oModel, "reports");
			this.getView().setModel(oModel, "reports");
		},
		toDetails: function (evt) {
			this.getOwnerComponent()
				.getRouter()
				.navTo("RouteDetails", {
					id: evt
						.getSource()
						.getBindingContextPath()
						.replace("/", "")
				});
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
		}
	});

});