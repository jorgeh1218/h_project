sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/Sorter",
	"sap/ui/model/Filter"
], function(Controller,Sorter,Filter) {
	"use strict";

	return Controller.extend("HELACOR_Project.controller.View1", {
		handleViewSettingsDialogButtonPressed: function(oEvent) {
			if (!this._oDialog) {
				this._oDialog = sap.ui.xmlfragment("HELACOR_Project.view.Dialog", this);
			}

			jQuery.sap.syncStyleClass("sapUiSizeCompact", this.getView(), this._oDialog);
			this._oDialog.open();
		},
		handleConfirm: function(oEvent) {
	
			var oView = this.getView();
			var oTable = oView.byId("__table0");

			var mParams = oEvent.getParameters();
			var oBinding = oTable.getBinding("items");

			//apply sorted
			var aSorters = [];
			var sPath = mParams.sortItem.getKey();
			var bDescending = mParams.sortDescending;
			aSorters.push(new Sorter(sPath, bDescending));
			oBinding.sort(aSorters);
			
			var aFilters = [];
			var aSplit = mParams.filterItems[0].getProperty("key").split("_");
			
			var sPath = aSplit[0];
			
			if(sPath=="TipoC")
			{
				var sOperator = aSplit[1];
				var sValue1 = aSplit[2];
				var oFilter = new Filter(sPath, sap.ui.model.FilterOperator.EQ,sValue1);
				aFilters.push(oFilter);
				oBinding.filter(aFilters);
			}
		},
		onRefresh: function(oEvent) {
			var oView = this.getView();
			var oTable = oView.byId("__table0");
			var oBinding = oTable.getBinding("items");
			oBinding.filter([]);
		},
	});
});