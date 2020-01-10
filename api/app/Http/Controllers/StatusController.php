<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Status;
use Illuminate\Support\Facades\DB;

class StatusController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $employee = Status::orderBy('created_at','desc')->get();

        return ($employee);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        $employee = Status::where('status', '=', 1)->orderBy('created_at', 'DESC')->get();
        $employee1 = Status::where('status', '=', 0)->orderBy('updated_at', 'DESC')->get();
        return ([$employee,$employee1]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        // print_r('function call');
        $request->validate([
            'employee_id'=>'required',
            'full_name'=>'required',
            'family_name'=>'required',
            'gender'=>'required',
            'birth'=>'required',
            'join'=>'required',
            'position'=>'required',
            'email_id'=>'required',
            'phone_number'=>'required'
            // 'official_email'=>'required',
            // 'education_details'=>'required',
            // 'skils'=>'required',
            // 'file' => 'required|Image|max:7168',
            // 'street_name'=>'required',
            // 'city_town'=>'required',
            // 'district'=>'required',
            // 'pin_code'=>'required',
            // 'account_number'=>'required',
            // 'ifsc_code'=>'required',
            // 'bank_name'=>'required',
            // 'branch_name'=>'required'
        ]);
        $image = $request->file('file');
if($image != null){
    $name = time().'.'.$image->getClientOriginalExtension();
    // $path = public_path('/storage/employee/');
    $path = @'C:\xampp\htdocs\LIVEHRMS\upload';
    $image->move($path,$name);
}

            // $register = array(
            //     'employee_id' => $request->get('employee_id'),
            //     'full_name' => $request->get('full_name'),
            //     'family_name' => $request->get('family_name'),
            //     'gender' => $request->get('gender'),
            //     'birth' => $request->get('birth'),
            //     'join' => $request->get('join'),
            //     'position' => $request->get('position'),
            //     'email_id' => $request->get('email_id'),
            //     'phone_number' => $request->get('phone_number'),
            //     'official_email' => $request->get('official_email'),
            //     'education_details' => $request->get('education_details'),
            //     'skils' => $request->get('skils'),
            //     'img' => $name,
            //     'street_name' => $request->get('street_name'),
            //     'city_town' => $request->get('city_town'),
            //     'district' => $request->get('district'),
            //     'pin_code' => $request->get('pin_code'),
            //     'account_number' => $request->get('account_number'),
            //     'ifsc_code' => $request->get('ifsc_code'),
            //     'bank_name' => $request->get('bank_name'),
            //     'branch_name' => $request->get('branch_name'),
            //     'status' => true
            // );
            // Status::create($register);
            // return('Success');
            // return response()->json($register);
            $register = new Status();
            $register->employee_id = $request->get('employee_id');
                $register->full_name = $request->get('full_name');
                $register->family_name = $request->get('family_name');
                $register->gender = $request->get('gender');
                $register->birth = $request->get('birth');
                $register->join = $request->get('join');
                $register->position = $request->get('position');
                $register->email_id = $request->get('email_id');
                $register->phone_number = $request->get('phone_number');
                $register->official_email = $request->get('official_email');
                $register->education_details = $request->get('education_details');
                $register->skils = $request->get('skils');
                if($image != null){
                    $register->img = $name;
                }
                $register->street_name = $request->get('street_name');
                $register->city_town = $request->get('city_town');
                $register->district = $request->get('district');
                $register->pin_code = $request->get('pin_code');
                $register->account_number = $request->get('account_number');
                $register->ifsc_code = $request->get('ifsc_code');
                $register->bank_name = $request->get('bank_name');
                $register->branch_name = $request->get('branch_name');
                $register->status = true;


            $register->save();
            return('Employee Initiated Sucessfully');
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $employee = Status::find($id);
        return ($employee);

        }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $employee = Status::find($id);
        return ($employee);
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
        // print_r($nsame);

    // if($id != null){
        $request->validate([
            'employee_id'=>'required',
            'full_name'=>'required',
            'family_name'=>'required',
            'gender'=>'required',
            'birth'=>'required',
            'join'=>'required',
            'position'=>'required',
            'email_id'=>'required',
            'phone_number'=>'required'
            // 'official_email'=>'required',
            // 'education_details'=>'required',
            // 'skils'=>'required',
            // 'file' => 'required|Image|max:7168',
            // 'street_name'=>'required',
            // 'city_town'=>'required',
            // 'district'=>'required',
            // 'pin_code'=>'required',
            // 'account_number'=>'required',
            // 'ifsc_code'=>'required',
            // 'bank_name'=>'required',
            // 'branch_name'=>'required'
        ]);

    // }
    if($image !=null){
        $image = $request->file('file');
        $path = @'C:\xampp\htdocs\LIVEHRMS\upload';
        $image->move($path,$name);
    }
    // else{
    //     $request->validate([
    //         'employee_id'=>'required',
    //         'full_name'=>'required',
    //         'family_name'=>'required',
    //         'gender'=>'required',
    //         'birth'=>'required',
    //         'join'=>'required',
    //         'position'=>'required',
    //         'email_id'=>'required',
    //         'phone_number'=>'required'
    //         // 'official_email'=>'required',
    //         // 'education_details'=>'required',
    //         // 'skils'=>'required',
    //         // 'file' => 'required|Image|max:7168',
    //         // 'street_name'=>'required',
    //         // 'city_town'=>'required',
    //         // 'district'=>'required',
    //         // 'pin_code'=>'required',
    //         // 'account_number'=>'required',
    //         // 'ifsc_code'=>'required',
    //         // 'bank_name'=>'required',
    //         // 'branch_name'=>'required'
    //     ]);
    // }


            $register = Status::find($id);


                $register->employee_id = $request->get('employee_id');
                $register->full_name = $request->get('full_name');
                $register->family_name = $request->get('family_name');
                $register->gender = $request->get('gender');
                $register->birth = $request->get('birth');
                $register->join = $request->get('join');
                $register->position = $request->get('position');
                $register->email_id = $request->get('email_id');
                $register->phone_number = $request->get('phone_number');
                $register->official_email = $request->get('official_email');
                $register->education_details = $request->get('education_details');
                $register->skils = $request->get('skils');
                $register->img = $name;
                $register->street_name = $request->get('street_name');
                $register->city_town = $request->get('city_town');
                $register->district = $request->get('district');
                $register->pin_code = $request->get('pin_code');
                $register->account_number = $request->get('account_number');
                $register->ifsc_code = $request->get('ifsc_code');
                $register->bank_name = $request->get('bank_name');
                $register->branch_name = $request->get('branch_name');


            $register->save();
            return('Employee Updated');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $employee = Status::find($id);
        $employee->delete();

        return ('Employee Deleted');
    }


    public function status_update(Request $request, $id)
    {

       $tf = $request->get('status');
       $check = Status::find($id);
            if($tf == 1)
            {
                $check->status = $request->get('status');
                $check->save();
                return('Employee Active');
            }else
            {
                    $check->status = $request->get('status');
                    $check->save();
                    return('Employee Inactive');
            }
    }

    public function Selectize(){

        $roles =Status::all();
        // $myField = Status::Find($employee_id);
        // $Find=table('Status')->select('employee_id')->get();
        return($roles);


    }
    public function one_emp(Request $request)
    {
        $one_id = $request->get('employee_id');
        $one = Status:: where('employee_id',$one_id)->get();
        return $one;
    }

}
