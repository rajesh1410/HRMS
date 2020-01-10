 if($request->hasfile('FilleName'))
         {
            $file = $request->file('FilleName');
            $FilleName=time().$file->getClientOriginalName();
            // echo "<pre>";
            // print_r(public_path());exit();
            $file->move(public_path().'/','images','/', $FilleName);
         }

        $users = new \App\EmpolyeeReg;
            $users->Empolyee_id = $request->get('Empolyee_id');
            $users->FullName=$request->get('FullName');
            $users->FamilyName=$request->get('FamilyName');
            $users->Gender=$request->get('Gender');
            $users->DOB=$request->get('DOB');
            $users->DOJ=$request->get('DOJ');
            $users->Position=$request->get('Position');
            $users->Email=$request->get('Email');
            $users->Phone_no=$request->get('Phoneno');
            $users->Offical_Email=$request->get('Offical_Email');
            $users->Education_Deatil=$request->get('Education_Deatil');
            $users->Skils=$request->get('Skils');
            $users->FilleName=$name,;
            $users->StreetName=$request->get('StreetName');
            $users->City=$request->get('City');
            $users->District=$request->get('District');
            $users->Pincode=$request->get('Pincode');
            $users->AccountNumber=$request->get('AccountNumber');
            $users->IFSC_code=$request->get('IFSC_code');
            $users->BankName=$request->get('BankName');
            $users->BranchName=$request->get('BranchName');

       return redirect('passports')->with('success', 'Information has been added');
    }


     if($request->hasfile('filename'))
         {
            $file = $request->file('filename');
            $name=time().$file->getClientOriginalName();
            $file->move(public_path().'/images/', $name);
         }
        $passport= new \App\Passport;
        $passport->name=$request->get('name');
        $passport->email=$request->get('email');
        $passport->number=$request->get('number');
        $date=date_create($request->get('date'));
        $format = date_format($date,"Y-m-d");
        $passport->date = strtotime($format);
        $passport->office=$request->get('office');
        $passport->filename=$name;
        $passport->save();
        
    return redirect('passports')->with('success', 'Information has been added');
     }