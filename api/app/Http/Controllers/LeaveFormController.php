<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\LeaveForm;


class LeaveFormController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $users = DB::table('leave_forms')
        ->join('statuses','statuses.employee_id','employee_name')
        ->select('statuses.full_name','leave_forms.*')
        ->where('leave_forms.status','=',null)
        ->orderBy('updated_at', 'DESC')
        ->get();
        return ($users);
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

        $date = $request->get('from_date');
        // print_r($date);
        // exit();
        if($date != null){
            $request->validate([
                'employee_name'=>'required',
                'leave_type'=>'required',
                'from_date'=>'required',
                'to_date'=>'required',
                'totaldays'=>'required',
                'leave_reason'=>'required'

              ]);
        }else{
            $request->validate([
                'employee_name'=>'required',
                'leave_type'=>'required',
                'permission_date'=>'required',
                'from_time'=>'required',
                'to_time'=>'required',
                'totaldays'=>'required',
                'leave_reason'=>'required'

              ]);
        }

if($date != null){
    $users= new LeaveForm([
        'employee_name'=>$request->get('employee_name'),
        'leave_type'=>$request->get('leave_type'),
        'from_date'=>$request->get('from_date'),
        'to_date'=>$request->get('to_date'),
        'totaldays'=>$request->get('totaldays'),
        'leave_reason'=>$request->get('leave_reason')
      ]);
}else{
    $users= new LeaveForm([
        'employee_name'=>$request->get('employee_name'),
        'leave_type'=>$request->get('leave_type'),
        'permission_date'=>$request->get('permission_date'),
        'from_time'=>$request->get('from_time'),
        'to_time'=>$request->get('to_time'),
        'totaldays'=>$request->get('totaldays'),
        'leave_reason'=>$request->get('leave_reason')
      ]);
}


      $users->save();
      return('Apply Leave Sucessfully!');
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show()
    {
        $users = DB::table('leave_forms')
        ->join('statuses','statuses.employee_id','employee_name')
        ->select('statuses.full_name','leave_forms.*')
        ->where('leave_forms.status','!=',null)
        ->orderBy('updated_at', 'DESC')
        ->get();
        return ($users);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $users = LeaveForm::find($id);
         return($users);
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
        $request->validate([
        'status'=>'required'

        ]);

        $user = LeaveForm::find($id);
        $user->status = $request->get('status');
        $user->save();

        return("Leave Status Changed");
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $data = LeaveForm::find($id);
        $data->delete();
        return("Leave Deleted");
    }
    public function LeaveData(Request $request)
    {
        $data= $request->get('empid');
        $users = DB:: table('leave_forms')
        ->where('leave_forms.employee_name','=',$data)
        ->where('leave_forms.status',null)
        ->join('statuses','leave_forms.employee_name','statuses.employee_id')
        ->select('leave_forms.*','statuses.full_name')
        ->orderBy('updated_at', 'DESC')
        ->get();
        $users1 = DB:: table('leave_forms')
        ->where('leave_forms.employee_name','=',$data)
        ->where('leave_forms.status', '!=', null)
        ->join('statuses','leave_forms.employee_name','statuses.employee_id')
        ->select('leave_forms.*','statuses.full_name')
        ->orderBy('updated_at', 'DESC')
        ->get();
        return([$users,$users1]);
    }

    public function find_leave(Request $request)
    {
        $employee_id = $request->get('employee');
        $from_date = $request->get('from_date');
        $to_date = $request->get('to_date');
        $status = $request->get('status');
        // print_r($employee_id);
        // exit();
        $users = DB::table('leave_forms')
        ->where('employee_name',$employee_id)
        ->where('status',$status)
        // ->join('statuses','statuses.employee_id','leave_forms.employee_name')
        // ->select('statuses.full_name','leave_forms.*')
        ->get();

        return ($users);
    }

    public function leave_report(Request $request)
    {
        $employee_id = $request->get('employee');
        $status = $request->get('status');
        $from_date = $request->get('from_date');
        $to_date = $request->get('to_date');

        $data = DB :: table('leave_forms')
            ->join('statuses','leave_forms.employee_name','statuses.employee_id')
           ->select( 'leave_forms.id','leave_forms.from_time','leave_forms.to_time','leave_forms.leave_reason','leave_forms.permission_date','leave_forms.leave_type','leave_forms.status',
           DB::raw("(CASE WHEN leave_forms.from_date <= '$from_date' THEN '$from_date' ELSE leave_forms.from_date END) AS from_date"),
           DB::raw("(CASE WHEN leave_forms.to_date >= '$to_date' THEN '$to_date' ELSE leave_forms.to_date END) AS to_date"),
        //    $total = DB::raw("DATEDIFF(
        //     (CASE WHEN leave_forms.to_date >= '$to_date' THEN '$to_date' ELSE leave_forms.to_date END),
        //     (CASE WHEN leave_forms.from_date <= '$from_date' THEN '$from_date' ELSE leave_forms.from_date END)
        //     )+1
        //             AS total"),

            DB::raw("(CASE WHEN leave_forms.permission_date IS NOT NULL
            THEN leave_forms.totaldays ELSE DATEDIFF(
                (CASE WHEN leave_forms.to_date >= '$to_date' THEN '$to_date' ELSE leave_forms.to_date END),
                (CASE WHEN leave_forms.from_date <= '$from_date' THEN '$from_date' ELSE leave_forms.from_date END)
                )+1 END) AS totaldays"),

            'statuses.full_name'

           )
           ->where('leave_forms.employee_name',$employee_id)
        ->where('leave_forms.status',$status)
        ->where(function($a) use( $from_date,$to_date){
            $a->whereBetween('leave_forms.permission_date',[$from_date,$to_date]);
            $a->orwhereBetween('leave_forms.from_date',[$from_date,$to_date]);
            $a->orwhereBetween('leave_forms.to_date',[$from_date,$to_date]);
        })
        ->orwhere(function($b) use($from_date,$to_date){
            $b->orwhere('leave_forms.from_date','<=',$from_date);
            $b->where('leave_forms.to_date','>=',$to_date);
        })
           ->get();
           return($data);
    }

    public function get_leave($id)
    {
        // $data = LeaveForm::where('id',$id)->where('status',null)->get();
        // $data = LeaveForm :: find($id);
        // $name = $data->get('employee_name');
        $final = DB::table('leave_forms')
        ->where('leave_forms.id',$id)
        ->join('statuses','leave_forms.employee_name','statuses.employee_id')
        ->select('leave_forms.*','statuses.full_name')
        ->get();
        return $final;
    }

    public function emp_update(Request $request , $id)
    {
        $date = $request->get('from_date');
        $users = LeaveForm::find($id);
        if($date != null){
            $request->validate([
                'employee_name'=>'required',
                'leave_type'=>'required',
                'from_date'=>'required',
                'to_date'=>'required',
                'totaldays'=>'required',
                'leave_reason'=>'required'

              ]);
        }else{
            $request->validate([
                'employee_name'=>'required',
                'leave_type'=>'required',
                'permission_date'=>'required',
                'from_time'=>'required',
                'to_time'=>'required',
                'totaldays'=>'required',
                'leave_reason'=>'required'

              ]);
        }

if($date != null){

        $users->employee_name = $request->get('employee_name');
        $users->leave_type = $request->get('leave_type');
        $users->from_date = $request->get('from_date');
        $users->to_date = $request->get('to_date');
        $users->totaldays = $request->get('totaldays');
        $users->leave_reason = $request->get('leave_reason');

}else{

        $users->employee_name = $request->get('employee_name');
        $users->leave_type = $request->get('leave_type');
        $users->permission_date = $request->get('permission_date');
        $users->from_time = $request->get('from_time');
        $users->to_time = $request->get('to_time');
        $users->totaldays = $request->get('totaldays');
        $users->leave_reason = $request->get('leave_reason');

}


      $users->save();
      return('Updated Leave Sucessfully!');
    }


    // public function leave_report(Request $request)
    // {
    //     $employee_id = $request->get('employee');
    //     $status = $request->get('status');
    //     $from_date = $request->get('from_date');
    //     $to_date = $request->get('to_date');

    //     $data = DB :: table('leave_forms')
    //         ->join('statuses','leave_forms.employee_name','statuses.employee_id')
    //        ->select( 'leave_forms.id','leave_forms.from_time','leave_forms.to_time','leave_forms.leave_reason','leave_forms.permission_date','leave_forms.leave_type','leave_forms.status',
    //        DB::raw("(CASE WHEN leave_forms.from_date <= '$from_date' THEN '$from_date' ELSE leave_forms.from_date END) AS from_date"),
    //        DB::raw("(CASE WHEN leave_forms.to_date >= '$to_date' THEN '$to_date' ELSE leave_forms.to_date END) AS to_date"),
    //     //    $total = DB::raw("DATEDIFF(
    //     //     (CASE WHEN leave_forms.to_date >= '$to_date' THEN '$to_date' ELSE leave_forms.to_date END),
    //     //     (CASE WHEN leave_forms.from_date <= '$from_date' THEN '$from_date' ELSE leave_forms.from_date END)
    //     //     )+1
    //     //             AS total"),

    //         DB::raw("(CASE WHEN leave_forms.permission_date IS NOT NULL
    //         THEN leave_forms.totaldays ELSE DATEDIFF(
    //             (CASE WHEN leave_forms.to_date >= '$to_date' THEN '$to_date' ELSE leave_forms.to_date END),
    //             (CASE WHEN leave_forms.from_date <= '$from_date' THEN '$from_date' ELSE leave_forms.from_date END)
    //             )+1 END) AS totaldays"),

    //         'statuses.full_name'

    //        )
    //        ->where('leave_forms.employee_name',$employee_id)
    //        ->where('leave_forms.status',$status)
    //        ->whereBetween('leave_forms.permission_date',[$from_date,$to_date])
    //        ->orwhereBetween('leave_forms.from_date',[$from_date,$to_date])
    //        ->orwhereBetween('leave_forms.to_date',[$from_date,$to_date])
    //        ->orwhere('leave_forms.from_date','<=',$from_date)
    //        ->where('leave_forms.to_date','>=',$to_date)
    //        ->get();
    //        return($data);
    // }





}
