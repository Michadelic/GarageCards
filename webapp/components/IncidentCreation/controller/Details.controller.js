sap.ui.define([
	"sap/ui/core/mvc/Controller",

	"../model/formatter"
], function (Controller, formatter) {
	"use strict";

	return Controller.extend("com.garageseries.Incident_CF.controller.Details", {

		formatter: formatter,
		onInit: function () {
			this.getOwnerComponent()
				.getRouter()
				.getRoute("RouteDetails")
				.attachPatternMatched(this._onRouteMatched, this);
			var oModel = sap.ui.getCore().getModel("reports");
			this.getView().setModel(oModel);
		},
		_onRouteMatched: function (oEvent) {
			var id = oEvent.getParameter("arguments").id;

			this.getView()
				.byId("details")
				.bindElement({
					path: "/" + id
				});
		},
		onNavButtonPress: function () {
				this.getOwnerComponent()
					.getRouter()
					.navTo("RouteMain", {});
			}
			/**
			 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
			 * (NOT before the first rendering! onInit() is used for that one!).
			 * @memberOf com.garageseries.Incident_CF.view.Details
			 */
			//	onBeforeRendering: function() {
			//
			//	},

		/**
		 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		 * This hook is the same one that SAPUI5 controls get after being rendered.
		 * @memberOf com.garageseries.Incident_CF.view.Details
		 */
		//	onAfterRendering: function() {
		//
		//	},

		/**
		 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		 * @memberOf com.garageseries.Incident_CF.view.Details
		 */
		//	onExit: function() {
		//
		//	}

	});

});