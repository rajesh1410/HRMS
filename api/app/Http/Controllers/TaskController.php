<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Task;
use DB;

class TaskController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $task = DB:: table('tasks')
            ->join('statuses','tasks.assign','statuses.employee_id')
            ->select('tasks.*','statuses.full_name')
            ->get();
        return($task);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function EmpTask(Request $request)
    {
        $EmpId = $request->get('empid');
        $Emptask = Task::where('assign','like','%'.$EmpId.'%')->get();
        return($Emptask);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        // print_r($request->get('file'));
        $request->validate([
            'project'=>'required',
            'details'=>'required',
            'assign'=>'required',
            'status'=>'required',
            'start'=>'required',
            'end'=>'required',
            'file' => 'required|Image|max:20480'
        ]);

            $image = $request->file('file');
            $name = time().'.'.$image->getClientOriginalExtension();
            $path = @'C:\xampp\htdocs\LIVEHRMS\upload\task';
            $image->move($path,$name);

            $register = array(
                'project' => $request->get('project'),
                'details' => $request->get('details'),
                'assign' => $request->get('assign'),
                'status' => $request->get('status'),
                'start' => $request->get('start'),
                'end' => $request->get('end'),
                'img' => $name
            );
            Task::create($register);
            return('Task Add');
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $task = DB :: table('tasks')
            ->where('tasks.id',$id)
            ->join('statuses','tasks.assign','statuses.employee_id')
            ->select('tasks.*','statuses.full_name')
            ->get();
           return($task);
        // $log = Task::select('project','assign')->where('id',1)->get();
        // return($task);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
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
        $image = $request->file('file');
        $name = $request->input('img');
        if($image != null){
            $request->validate([
                'project'=>'required',
                'details'=>'required',
                'assign'=>'required',
                'status'=>'required',
                'start'=>'required',
                'end'=>'required',
                'file' => 'required|Image|max:20480'
            ]);

            $image = $request->file('file');
            $path = @'C:\xampp\htdocs\LIVEHRMS\upload\task';
            $image->move($path,$name);

        }else{
            $request->validate([
                'project'=>'required',
                'details'=>'required',
                'assign'=>'required',
                'status'=>'required',
                'start'=>'required',
                'end'=>'required'
                // 'file' => 'required|Image|max:20480'
            ]);
        }

        $register = Task::find($id);


                $register->project = $request->get('project');
                $register->details = $request->get('details');
                $register->assign = $request->get('assign');
                $register->status = $request->get('status');
                $register->start = $request->get('start');
                $register->end = $request->get('end');
                $register->img = $name;


            $register->save();
            return('Task Updated');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $employee = Task::find($id);
        $employee->delete();

        return ('Task Deleted');
    }
    public function log(Request $request)
    {
        $name = $request->get('name');
        $pwd = $request->get('pwd');
    }
}
