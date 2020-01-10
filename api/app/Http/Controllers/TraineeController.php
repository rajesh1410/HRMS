<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Trainee;

class TraineeController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $Trainee = Trainee::all();
        return ($Trainee);
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
            'Traineename'    => 'required',
            'Qualification'  => 'required',
            'Course'         =>'required',
            'Duration'         =>'required',
            'Start_date'         =>'required',
            'End_date'         =>'required',
            'Mobile_number'         =>'required',
            'Email'         =>'required',
            'Address'         =>'required',
            'Total_fees'         =>'required',
            'Paid_date'         =>'required',
            'paid_amount'         =>'required',
            'Remaining_amount'         =>'required'
        ]);

        $Trainee = new Trainee([
            'Traineename'=>$request->get('Traineename'),
            'Qualification'=>$request->get('Qualification'),
            'Course'=>$request->get('Course'),
            'Duration'=>$request->get('Duration'),
            'Start_date'=>$request->get('Start_date'),
            'End_date'=>$request->get('End_date'),
            'Mobile_number'=>$request->get('Mobile_number'),
            'Email'=>$request->get('Email'),
            'Address'=>$request->get('Address'),
            'Total_fees'=>$request->get('Total_fees'),
            'Paid_date'=>$request->get('Paid_date'),
            'paid_amount'=>$request->get('paid_amount'),
            'Remaining_amount'=>$request->get('Remaining_amount')
        ]);
        $Trainee->save();
        return ($Trainee);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show()
    {
        $Trainee = Trainee::all('Traineename');
        return($Trainee);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $Trainee = Trainee::find($id);
        return ($Trainee);    
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
            'Traineename'    => 'required',
            'Qualification'  => 'required',
            'Course'         =>'required',
            'Duration'         =>'required',
            'Start_date'         =>'required',
            'End_date'         =>'required',
            'Mobile_number'         =>'required',
            'Email'         =>'required',
            'Address'         =>'required',
            'Total_fees'         =>'required',
            'Paid_date'         =>'required',
            'paid_amount'         =>'required',
            'Remaining_amount'         =>'required'
        ]);
        $Trainee = Trainee::find($id);
        $Trainee->Traineename=$request->get('Traineename');
        $Trainee->Qualification =$request->get('Qualification');
        $Trainee->Course =$request->get('Course');
        $Trainee->Duration =$request->get('Duration');
        $Trainee->Start_date =$request->get('Start_date');
        $Trainee->End_date =$request->get('End_date');
        $Trainee->Mobile_number =$request->get('Mobile_number');
        $Trainee->Email =$request->get('Email');
        $Trainee->Address =$request->get('Address');
        $Trainee->Total_fees =$request->get('Total_fees');
        $Trainee->Paid_date =$request->get('Paid_date');
        $Trainee->paid_amount =$request->get('paid_amount');
        $Trainee->Remaining_amount =$request->get('Remaining_amount');

        $Trainee->save();
        return ($Trainee);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $Trainee = Trainee::find($id);
        $Trainee->delete();
        return($Trainee);
    }
    public function find(Request $request)
    {
        $Traineename = $request->get('Traineename');
        $Course      = $request->get('Course');

         // $Trainee = Trainee::where('Traineename','=',$Traineename)->where('Course','=',$Course)->get();
         // return ($Trainee);
        if(($Traineename != null)&&($Course != null)){
         $Trainee = Trainee::where('Traineename','=',$Traineename)->where('Course','=',$Course)->get();
         return ($Trainee);
        }

      if($Traineename!=null){
        
        $Trainee=Trainee::where('Traineename','=',$Traineename)->get();
        return($Trainee);
        
        }

        else {
        $Trainee=Trainee::where('Course','=',$Course)->get();
        return($Trainee);
            
        }

        
    }
}
        