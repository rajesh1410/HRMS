<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Holidays;

class HolidaysController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $Leave = Holidays::orderBy('created_at', 'DESC')->get();
        return($Leave);
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
            'Holidays'=>'required',
            'Date'=>'required'
        ]);
        $Leave = new Holidays([
            'Holidays'=>$request->get('Holidays'),
            'Date'=>$request->get('Date')
        ]);
        $Leave->save();
        return($Leave);
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
        $Leave = Holidays::find($id);
        return($Leave);
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
            'Holidays'=>'required',
            'Date'=>'required'
        ]);

        $Leave = Holidays::find($id);
        $Leave->Holidays = $request->get('Holidays');
        $Leave->Date = $request->get('Date');

        $Leave->save();
        return($Leave);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $Leave = Holidays::find($id);
        $Leave->delete();
        return($Leave);
    }
}
