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
			/*var fnWaitForWS = function () {
				var oWS = window._oWS;

				if (!oWS) {
					window.setTimeout(fnWaitForWS, 100);
				} else {
					oWS.attachMessage(function (oEvent) {
						var sMessage = oEvent.getParameter("data");
						//this._reload(sMessage);
						this.getView().getModel().refresh();
					}.bind(this));
				}
		   }.bind(this);
		   fnWaitForWS();*/

			var oWS = new WebSocket("ws://em-consumer-active-jaguar.cfapps.us10.hana.ondemand.com/");
			oWS.attachMessage(function (oEvent) {
				this.getView().getModel().refresh();
			}.bind(this));

		   var oModel = new JSONModel([]);
		   this.getView().setModel(oModel, "entries");
		},

		_reload: function (sMessage) {
			var aResult = JSON.parse(sMessage);
			//alert(aResult.name + " " + aResult.description + " " + aResult.category);
			var oModel = this.getView().getModel("entries");
			var aEntries = oModel.getData();
			aEntries.push({
				name: aResult.name,
				description: aResult.description,
				category: aResult.category
			});
			oModel.setData(aEntries);

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
			MessageBox.show("Nav to incident here...");
		}
	});
});