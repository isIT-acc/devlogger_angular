import { Component, OnInit } from '@angular/core';
import { Log } from '../../models/Log';
import { LogService } from '../../services/log.service';
import { NgForm } from '@angular/forms';
@Component({
  selector: 'app-log-form',
  templateUrl: './log-form.component.html',
  styleUrls: ['./log-form.component.css'],
})
export class LogFormComponent implements OnInit {
  id: string = null;
  text: string;
  date: any;
  isNew: boolean = false;

  constructor(private logService: LogService) {}
  ngOnInit(): void {
    // Subscribe to selected log observable
    this.logService.selectedLog.subscribe((log) => {
      if (log.id !== null) {
        this.id = log.id;
        this.text = log.text;
        this.date = log.date;
        this.isNew = false;
      }
    });
  }

  onSubmit(form: NgForm) {
    if (this.isNew) {
      this.addNewLog(form.value.text);
    } else {
      this.logService.deleteLog(this.id);
      // this.numOfComps -= 1;
      this.addNewLog(form.value.text);
      // remove element from array in component, refresh ids in array, add new log here like new
      this.isNew = true;
    }
    this.text = '';
    // clear state
    // this.clearState();
  }

  clearState() {
    this.isNew = true;
    this.id = '';
    this.text = '';
    this.date = '';
    this.logService.clearState();
  }
  // add new log to end of array
  addNewLog(val: string) {
    this.logService.addNewLog({
      id: this.uuidv4(),
      text: val,
      date: new Date(),
    });
  }

  uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (
      c
    ) {
      var r = (Math.random() * 16) | 0,
        v = c == 'x' ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  }
}
