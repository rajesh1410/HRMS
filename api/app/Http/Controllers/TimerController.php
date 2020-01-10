<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\DB;

use Illuminate\Http\Request;
use App\Timer;
use Carbon\Carbon;

class TimerController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $results = Timer::where('type', '=', 'break')
    ->where('end_time', '=', null)
    ->get();
    return($results);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        $data = DB::table('timers')->where('created_at', Carbon::yesterday())
        ->where('attendance_id','1')->get();
        return $data;
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        date_default_timezone_set('Asia/Kolkata');
        $position = $request->get('position');
        // $request->validate([
        //     'type'=>'required',
        //     'attendance_id'=>'required'
        // ]);
        if($position != 'Empolyee'){
            $register = array(
                'type' => $request->get('type'),
                'attendance_id' => $request->get('attendance_id'),
                'start_time' => $request->get('start'),
                'end_time' => $request->get('end')
            );
        }else{
            $register = array(
                'type' => $request->get('type'),
                'attendance_id' => $request->get('attendance_id'),
                'start_time' => date('H:i:s')
            );
        }

            $timerId = Timer::create($register);
            return($timerId);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        // $login = Timer::where('attendance_id', $id)
        //     ->where('type','login')
        //     ->sum(DB::raw("TIME_TO_SEC(total_hr)"));
        $call = DB::table('timers')->where('attendance_id', $id)
            ->where('type','call')
            ->sum(DB::raw("TIME_TO_SEC(total_hr)"));
        $lunch = Timer::where('attendance_id', $id)
            ->where('type','lunch')
            ->sum(DB::raw("TIME_TO_SEC(total_hr)"));
        $break = Timer::where('attendance_id', $id)
            ->where('type','break')
            ->sum(DB::raw("TIME_TO_SEC(total_hr)"));

        $total_time = $call+$lunch+$break;

        // $update = DB::table('attendances')
        // // $update->total_hrs = date('H:i:s',$total_time);
        // ->where('id',$id)
        // ->update(['total_hrs'=>date('H:i:s',$total_time)]);
        // // $update->save();
        return ([date('H:i:s',$call),date('H:i:s',$lunch),date('H:i:s',$break),date('H:i:s',$total_time)]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {

        $check = DB::table('timers')->where('end_time',null)
        ->where('attendance_id',$id)
        ->get();

        // $data = $check[0];
        return($check);
        // $data1 = $check[1];
        // date_default_timezone_set('Asia/Kolkata');
        // $now_time = date('H:i:s');


        // $log_time = $data->start_time;

        // $break = $data1->start_time;
        // $log=strtotime($log_time);
        // $now=strtotime($now_time);
        // $break=strtotime($break);
        // $log1 = $now - $log;
        // $break1 = $now - $break;



        // // return $check;
        // return ([$check,$now_time,$log_time,$log1]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {


        $register = Timer::find($id);
        $start_time = $request->get('start_time');
        $end_time = $request->get('end_time');
        $start=strtotime($start_time);
        $end=strtotime($end_time);
        $total = $end - $start;
        $final = date('H:i:s',$total);
        $register->total_hr = $final;
        $register->save();
        return($register);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $employee = Timer::find($id);
        $employee->delete();

        return ('Task Deleted');
    }
    public function up(Request $request, $id)
    {
        date_default_timezone_set('Asia/Kolkata');
        $end_time = date('H:i:s');
        // $type = $request->get('type');

            $users = Timer::where('end_time', null)->where('id', $id)->first();
            $users->end_time = $end_time;
            $users->save();
            return($users);

    }

    public function total_update(Request $request, $id)
    {
        $login = Timer::where('attendance_id', $id)
            ->where('type','login')
            ->sum(DB::raw("TIME_TO_SEC(total_hr)"));
        $call = Timer::where('attendance_id', $id)
            ->where('type','call')
            ->sum(DB::raw("TIME_TO_SEC(total_hr)"));
        $lunch = Timer::where('attendance_id', $id)
            ->where('type','lunch')
            ->sum(DB::raw("TIME_TO_SEC(total_hr)"));
        $break = Timer::where('attendance_id', $id)
            ->where('type','break')
            ->sum(DB::raw("TIME_TO_SEC(total_hr)"));

        $total_time = $login - ($call+$lunch+$break);

        $update = DB::table('attendances')
        // $update->total_hrs = date('H:i:s',$total_time);
        ->where('id',$id)
        ->update(['total_hrs'=>date('H:i:s',$total_time)]);
        // $update->save();
        return (date('H:i:s',$total_time));
    }

    public function manual_get($id){
        $data = DB::table('timers')->where('attendance_id',$id)->get();
        return($data);
    }

    public function manual_update(Request $request, $id)
    {
        // print_r($request->get('id'));
        // print_r($id);
        // exit();
        $data = Timer::find($id);
        $data->start_time = $request->get('start_time');
        $data->end_time = $request->get('end_time');
        $data->save();
        return($data);
    }

    public function stop_watch(Request $request)
    {
        $type = $request->get('type');

        date_default_timezone_set('Asia/Kolkata');
        $now_time = date('H:i:s');

        if($type == 'login'){
            $start_time = $request->get('start_time');
            $start=strtotime($start_time);
            $end=strtotime($now_time);
            $total = $end - $start;
            $final = gmdate('H:i:s',$total);
        }else{
            $start_time = $request->get('start_time');
            $start=strtotime($start_time);
            $end=strtotime($now_time);
            $total = $end - $start;
            // $final = gmdate('H:i:s',$total);
        }
        return([$total,$type]);
    }

    public function full_attendance_data(Request $request)
    {
        $attendance_id = $request->get('attendance_id');

        $start_time = $request->get('start');
        $end_time = $request->get('login_end');
        $start=strtotime($start_time);
        $end=strtotime($end_time);
        $total = $end - $start;
        $final = date('H:i:s',$total);

        $start_time1 = $request->get('out_for_lunch');
        $end_time1 = $request->get('lunch_end');
        $start1=strtotime($start_time1);
        $end1=strtotime($end_time1);
        $total1 = $end1 - $start1;
        $final1 = date('H:i:s',$total1);

        $log = array(
            'start_time'=>$request->get('start'),
            'end_time'=>$request->get('login_end'),
            'type' => $request->get('login_type'),
            'attendance_id' => $attendance_id,
            'total_hr' => $final

        );
        Timer::create($log);
        $lunch = array('start_time'=>$request->get('out_for_lunch'),
            'end_time'=>$request->get('lunch_end'),
            'type' => $request->get('lunch_type'),
            'attendance_id' => $attendance_id,
            'total_hr' => $final1);
            Timer::create($lunch);

            $data = collect($request->get('cb'));
$count = 0;
foreach($data as $cd)
{

            $start_time = $cd['start'];
            $end_time=$cd['end'];
            $type = $cd['cb_type'];
            // $attendance_id = $attendance_id;

        $start_time2 = $start_time;
        $end_time2 = $end_time;
        $start2=strtotime($start_time2);
        $end2=strtotime($end_time2);
        $total2 = $end2 - $start2;
        $final2 = date('H:i:s',$total2);


        $cb = array(
            'start_time'=> $start_time,
            'end_time'=>$end_time,
            'type' => $type,
            'attendance_id' => $attendance_id,
            'total_hr' => $final2
        );
    Timer::create($cb);
$count += 1;
}
return [$attendance_id,$count];

        // $data = collect($request);
        // $full = $data->count();
        // for($i =0; $i< $full; $i++)
        // {
        //     if($i == 0)
        //     {

        //             if('login' == $request[$i]['login_type'])
        //             {
        //                 $start_time = $request[$i]['start'];
        //                 $end_time = $request[$i]['login_end'];
        //                 $type = $request[$i]['login_type'];
        //                 $attendance_id = $request[$i]['attendance_id'];
        //                 $start=strtotime($start_time);
        //                 $end=strtotime($end_time);
        //                 $total = $end - $start;
        //                 $final = date('H:i:s',$total);

        //                 $login = array(
        //                         'start_time' => $start_time,
        //                         'end_time' => $end_time,
        //                         'type' => $type,
        //                         'attendance_id' => $attendance_id,
        //                         'total_hr' => $final
        //                 );

        //                 Timer::create($login);
        //             }
        //             if('lunch' == $request[$i]['lunch_type']){
        //                 $start_time = $request[$i]['out_for_lunch'];
        //                 $end_time = $request[$i]['lunch_end'];
        //                 $type = $request[$i]['lunch_type'];
        //                 $attendance_id = $request[$i]['attendance_id'];
        //                 $start=strtotime($start_time);
        //                 $end=strtotime($end_time);
        //                 $total = $end - $start;
        //                 $final = date('H:i:s',$total);

        //                 $lunch = array(
        //                     'start_time' => $start_time,
        //                     'end_time' => $end_time,
        //                     'type' => $type,
        //                     'attendance_id' => $attendance_id,
        //                     'total_hr' => $final
        //                 );
        //                 Timer::create($lunch);
        //             }

        //     }else{

        //             if('call' == $request[$i]['cb_type'] || 'break' == $request[$i]['cb_type'])
        //             {
        //                 $start_time = $request[$i]['start'];
        //                 $end_time = $request[$i]['end'];
        //                 $type = $request[$i]['cb_type'];
        //                 $attendance_id = $request[$i]['attendance_id'];
        //                 $start=strtotime($start_time);
        //                 $end=strtotime($end_time);
        //                 $total = $end - $start;
        //                 $final = date('H:i:s',$total);
        //                 $cb = array(
        //                     'start_time' => $start_time,
        //                     'end_time' => $end_time,
        //                     'type' => $type,
        //                     'attendance_id' => $attendance_id,
        //                     'total_hr' => $final
        //                 );
        //                 Timer::create($cb);
        //             }
        //     }
        // }

        // return ($cb);

    }




}
