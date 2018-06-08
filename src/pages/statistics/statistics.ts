import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {GeneralProvider} from '../../providers/general/general';
import {Global} from "../../app/global.config";

/**
 * Generated class for the StatisticsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-statistics',
  templateUrl: 'statistics.html',
})
export class StatisticsPage {
	groupId : string = "";
	statistics : any = {};
	constructor(public navCtrl: NavController, public navParams: NavParams, public global : Global, public general : GeneralProvider) {
		this.groupId = this.navParams.get('groupid');
		let loader = this.global.openLoader()
		 this.general.getStatistics(this.groupId).subscribe((response)=>{
		 	this.global.closeLoader(loader);
        	this.statistics = (response);	
        })
	}

	ionViewDidLoad() {
	console.log('ionViewDidLoad StatisticsPage');
	}

}
