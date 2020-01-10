<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\hrmsuser;
class HrmsUserController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        // $users = DB::table('statuses','hrmsusers');
         $users = hrmsuser::all();
        return ($users);
    //     return view('form_validation');
    //     function insert(Request $request)
    // {
    //  if(request()->ajax())
    //  {
    //   $data = array(
    //    'EmpolyeeName' => $request->get('EmpolyeeName'),
    //    'UserName'  => $request->get('UserName'),
    //    'Password'   => $request->get('Password'),
    //    'ConformPassword'  => $request->get('ConformPassword')
    //   );

    //   DB::table('hrmsuser')->insert($data);

    //   return response()->json(['success' => 'Data Added']);
    //  }
    // }

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
            'EmployeeId'=>'required',
            'UserName'=>'required',
            'Position'=>'required',
            'Password'=>'required',
            'ConformPassword'=>'required'
        ]);

        $users = new hrmsuser([
            'EmployeeId' => $request->get('EmployeeId'),
            'UserName' => $request->get('UserName'),
            'Position'=>$request->get('Position'),
            'Password' => $request->get('Password'),
            'ConformPassword' => $request->get('ConformPassword')
        ]);
        $users->save(); 
        return('Inserted Data Successfully!');
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
         $users = hrmsuser::find($id);
         return($users);
        //return view('contacts.edit', compact('contact'));
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
            'EmployeeId'=>'required',
            'UserName'=>'required',
            'Position'=>'required',
            'Password'=>'required',
            'ConformPassword'=>'required'
        ]);

        $user = hrmsuser::find($id);
        $user->EmployeeId =  $request->get('EmployeeId');
        $user->UserName = $request->get('UserName');
        $user->Position = $request->get('Position');
        $user->Password = $request->get('Password');
        $user->ConformPassword = $request->get('ConformPassword');
        $user->save();

        return($user);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
         $users = hrmsuser::find($id);
        $users->delete();
        return ($users);
        
    }

    public function Userlogin(Request $request)
    {
        $UserName = $request->get('username');
        $Password = $request->get('password');


        // $login = hrmsuser::select('UserName','Password')->where('UserName',$UserName)->where('Password',$Password)->get();

        // return($login);
         $login = hrmsuser::where('UserName','=',$UserName)->where('Password','=',$Password)->get();
         return ($login);
         
    }
}
