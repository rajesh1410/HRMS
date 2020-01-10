<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\EmpolyeeReg;

class EmpolyeeRegCont extends Controller
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
         if($request->hasfile('FilleName'))
         {
            $file = $request->file('FilleName');
            $name=time().$file->getClientOriginalName();
            // echo "<pre>";
            // print_r(public_path());exit();
            $file->move(public_path().'/images/', $name);
         }

        $users = new EmpolyeeReg([
            'Empolyee_id'=>$request->get('Empolyee_id'),
            'FullName'=>$request->get('FullName'),
            'FamilyName'=>$request->get('FamilyName'),
            'Gender'=>$request->get('Gender'),
            'DOB'=>$request->get('DOB'),
            'DOJ'=>$request->get('DOJ'),
            'Position'=>$request->get('Position'),
            'Email'=>$request->get('Email'),
            'Phone_no'=>$request->get('Phone_no'),
            'Offical_Email'=>$request->get('Offical_Email'),
            'Education_Deatil'=>$request->get('Education_Deatil'),
            'Skils'=>$request->get('Skils'),
            'FilleName'=>$request->get('FilleName'),
            'StreetName'=>$request->get('StreetName'),
            'City'=>$request->get('City'),
            'District'=>$request->get('District'),
            'Pincode'=>$request->get('Pincode'),
            'AccountNumber'=>$request->get('AccountNumber'),
            'IFSC_code'=>$request->get('IFSC_code'),
            'BankName'=>$request->get('BankName'),
            'BranchName'=>$request->get('BranchName'),
        ]);
        $users->save();
        return('Inserted Data Sucessfully!');
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
}
