<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Project;

class ProjectController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $Empolyee = Project::all();
        return ($Empolyee);

    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function EmpProjects(Request $request)
    {

     $data= $request->get('empid');
        // $Emp = Project::select('Assignee_Empolyee')->get();
        // return($Emp);
     $Emp = Project::where('Assignee_Empolyee','like','%'.$data.'%')->get();
    return($Emp);

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
            'Title' => 'required',
            'Description' => 'required',
            'Assignee_Empolyee' => 'required',
            'Status' => 'required',
            'Start_Date' => 'required',
            'End_Date' => 'required',
            'Image' => 'required|Image|max:2048'

        ]);
        $Image = $request ->file('Image');
        $path = @'C:\xampp\htdocs\LIVEHRMS\images';

        $new_name=rand().'.'.$Image->getClientOriginalExtension();

        $Image->move($path,$new_name);

        $form_data = array(
            'Title' => $request->Title,
            'Description'=>$request->Description,
            'Assignee_Empolyee'=>$request->Assignee_Empolyee,
            'Status'=>$request->Status,
            'Start_Date'=>$request->Start_Date,
            'End_Date'=>$request->End_Date,
            'Image'=>$new_name

        );
        Project::create($form_data);
        // return ('projects')->with('Success','Data add Successully.');
        return response()->json(['status'=> true,'response' => 'New Project Added Successully']);
        // return 'SuccessData add Successully.';
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {

        $form_data = Project::find($id);
        return ($form_data);
     }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $data = Project::findOrFail($id);
        return ($data);

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
        $image_name = $request->hidden_image;
        $Image = $request->file('Image');
        if($Image != '')
{
        $request->validate([
            'Title' => 'required',
            'Description' => 'required',
            'Assignee_Empolyee' => 'required',
            'Status' => 'required',
            'Start_Date' => 'required',
            'End_Date' => 'required',
            'Image' => 'required|Image|max:2048'

        ]);
        $image_name = rand() . '.' . $Image->getClientOriginalExtension();
        $path = @'C:\xampp\htdocs\LIVEHRMS\images';
        $Image->move($path, $image_name);
    }
    else{
        $request->validate([
            'Title' => 'required',
            'Description' => 'required',
            'Assignee_Empolyee' => 'required',
            'Status' => 'required',
            'Start_Date' => 'required',
            'End_Date' => 'required'

        ]);

    }

        $form_data = array(
            'Title'             =>   $request->Title,
            'Description'       =>   $request->Description,
            'Assignee_Empolyee' =>   $request->Assignee_Empolyee,
            'Status'            =>   $request->Status,
            'Start_Date'        =>   $request->Start_Date,
            'End_Date'          =>   $request->End_Date,
            'Image'            =>    $image_name
        );

        Project::whereId($id)->update($form_data);

        return ('Data is successfully updated');

         }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
         $form_data = Project::find($id);
        $form_data->delete();

        return ('Data is successfully deleted');
            }
}
