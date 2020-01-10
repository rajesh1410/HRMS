<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;
use Illuminate\Http\Request;
use App\attendance;

class attendanceController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
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
        //     'employee_name'=>'required',
        //     'date'=>'required',
        //     'start'=>'required'
        // ]);
        if($position != 'Empolyee'){
            $register = array(
                'employee_id' => $request->get('employee_name'),
                'login_date' => $request->get('date'),
                'login_time' => $request->get('start')
            );
        }else{
            $register = array(
                'employee_id' => $request->get('employee_name'),
                'login_date' => date('Y:m:d'),
                'login_time' => date('H:i:s')
            );
        }

            $data = attendance::create($register);
            // print_r($data->id);
            return($data->id);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $one_id = attendance:: find($id);
        return $one_id;
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
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
    public function get_yesterday_data(Request $request)
    {
        $id = $request->get('employee_id');
        $users = DB::table('attendances')
                ->where('employee_id',$id)
                ->where('total_hrs','<>',null)
                ->orderBy('created_at', 'desc')
                ->get();
                return $users;

    }
    public function attendance_check(Request $request)
    {
        $id = $request -> get('employee_id');
        // print_r($id);
        // exit();
        date_default_timezone_set('Asia/Kolkata');
        $check_date = date('Y:m:d');

        $users = DB::table('attendances')
                ->where('employee_id',$id)
                ->where('login_date', $check_date)
                ->where('total_hrs', null)
                ->get();
                return $users;
    }

    public function join()
    {
        date_default_timezone_set('Asia/Kolkata');
        $check_date = date('Y:m:d');

        $users = DB::table('attendances')
            ->where('login_date',$check_date)
            ->join('statuses', 'attendances.employee_id', '=', 'statuses.employee_id')
            // ->join('timers', 'attendances.id', '=', 'timers.attendance_id')
            // ->where('type','=','login')
            ->select('attendances.*', 'statuses.full_name')
            ->get();
            return $users;
    }

    public function attendance_report(Request $request)
    {
        $id = $request->get('employee');
        $froms = $request->get('from_date');
        $tos = $request->get('to_date');
        $from = gmdate('Y-m-d',strtotime($froms));
        $to = gmdate('Y-m-d',strtotime($tos));
        $date = DB:: table('attendances')
            ->where('employee_id',$id)
            ->whereBetween('login_date',[ $from , $to])
            ->orderBy('login_date')
            ->join('timers','attendances.id','timers.attendance_id')
            ->get();


        $name = DB::table('statuses')->select('full_name')
                ->where('employee_id',$id)->get();

        // $login = [];
        // // $call = [];
        // $lunch = [];
        // $break = [];
        //         foreach($date as $id)
        //         {
        //             $id1 = $id->id;

        //             $login[] = DB:: table('timers')->where('attendance_id',$id1)
        //             ->where('type','login')
        //             ->get();


        //             // $id1 = $id->id;
        //             // $call[] = DB:: table('timers')->where('attendance_id',$id1)
        //             // ->where('type','call')
        //             // ->get();

        //             // $id1 = $id->id;
        //             // $lunch = DB:: table('timers')->where('attendance_id',$id1)
        //             // ->where('type','lunch')
        //             // ->get();

        //             // $id1 = $id->id;
        //             // $break = DB:: table('timers')->where('attendance_id',$id1)
        //             // ->where('type','break')
        //             // ->get();

        //         }

        return [$date,$name];
    }
    public function test(Request $request )
    {

        $size = count(collect($request));
        return [$size,$request];
    }


}
