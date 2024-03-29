<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\JobDeatils;

class JobController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $admin = JobDeatils::all();
        return($admin);
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
        $request->validate([
            'Month'=>'required',
            'Position' =>'required'
        ]);
        $admin = new JobDeatils([
            'Month'=>$request->get('Month'),
            'Position'=>$request->get('Position')
        ]);
        $admin->save();
        return($admin);
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
        $request->validate([
            'Month'=>'required',
            'Position'=>'required'
        ]);
        $admin = JobDeatils::find($id);
        $admin->Month = $request->get('Month');
        $admin->Position = $request->get('Position');
        $admin->save();
        return($admin); 
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $admin = JobDeatils::find($id);
        $admin->delete();
        return($admin);
    }
}
