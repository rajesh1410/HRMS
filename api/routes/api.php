<?php

use App\Http\Controllers\LeaveFormController;
use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});
//user
Route::resource('users', 'HrmsUserController');

//leave
Route::resource('leave','LeaveFormController');
Route::get('leaveinfo','LeaveFormController@show');
Route::post('leaveData','LeaveFormController@leaveData');
Route::get('data','LeaveFormController@destroy');
Route::post('find_leave' , 'LeaveFormController@find_leave');
Route::post('leave_report' , 'LeaveFormController@leave_report');
Route::get('get_leave/{id}','LeaveFormController@get_leave');
Route::post('emp_update/{id}','LeaveFormController@emp_update');
Route::delete('delete_leave/{id}','LeaveFormController@destroy');

//Empoyee Register
Route::resource('EmpolyeeReg','EmpolyeeRegCont');

//project
Route::resource('project','ProjectController');
Route::POST('update/{id}','ProjectController@update');
Route::post('Empproject','ProjectController@EmpProjects');

//Attendance
Route::resource('Attendance','AttendanceController');

//user Login
Route::post('Login','HrmsUserController@Userlogin');

//Trainee Form
Route::resource('Trainee','TraineeController');
Route::get('edit/{id}','TraineeController@Edit');
Route::Delete('Delete/{id}','TraineeController@destroy');
Route::post('test/{id}','TraineeController@update');
Route::get('Traineename','TraineeController@show');
Route::post('find','TraineeController@find');

//employee
Route::post('status_register','StatusController@store');
Route::get('status_data','StatusController@index');
Route::get('status_tf','StatusController@create');
Route::get('status_edit/{id}','StatusController@edit');
Route::get('show/{id}',"StatusController@show");
Route::delete('status_delete/{id}','StatusController@destroy');
Route::post('status_update/{id}','StatusController@update');
Route::post('one_emp', 'StatusController@one_emp');

Route::post('status_check/{id}','StatusController@status_update');
Route::get('SelectEmp','StatusController@Selectize');

//Job Deatils
Route::resource('Job','JobController');

// task
Route::resource('task_add','TaskController');
Route::post('task_update/{id}','TaskController@update');
Route::post('log','TaskController@log');
Route::delete('task_delete/{id}','TaskController@destroy');
Route::get('info_task/{id}','TaskController@show');
Route::Post('EmpTask','TaskController@EmpTask');

//attendance
Route::post('login','attendanceController@store');
Route::post('get','attendanceController@get_yesterday_data');
Route::post('attendance_check','attendanceController@attendance_check');
Route::get('join','attendanceController@join');
Route::get('one_id/{id}', 'attendanceController@edit');
Route::post('attendance_report' , 'attendanceController@attendance_report');
Route::post('test','attendanceController@test');


//timer
Route::post('strat_time','TimerController@store');
Route::post('end_time/{id}','TimerController@up');
Route::post('total_time/{id}','TimerController@update');
Route::get('total_hour/{id}','TimerController@show');
Route::post('total_hrs/{id}','TimerController@total_update');
Route::get('timer_check/{id}','TimerController@edit');
Route::get('manual_get/{id}','TimerController@manual_get');
Route::post('manual_update/{id}','TimerController@manual_update');
Route::post('stop_watch' , 'TimerController@stop_watch');
Route::delete('timer_delete/{id}','TimerController@destroy');
Route::post('full_attendance_data','TimerController@full_attendance_data');

// Holidays

Route::resource('Holidays','HolidaysController');
Route::get('HolidaysEdit/{id}','HolidaysController@edit');
Route::post('HolidaysUpdate/{id}','HolidaysController@update');
Route::delete('HolidaysDelete/{id}','HolidaysController@destroy');
Route::resource('CalHolidays','CalenderHolidaysCont');
Route::delete('check','CalenderHolidaysCont@destroy');
Route::get('EditEvent/{id}','CalenderHolidaysCont@edit');
Route::post('UpdateEvent/{id}','CalenderHolidaysCont@update');

