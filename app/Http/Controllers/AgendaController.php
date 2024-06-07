<?php

namespace App\Http\Controllers;

use App\Models\Agenda;
use Illuminate\Http\Request;

class AgendaController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Agenda::all();
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $agenda = new Agenda();
        $agenda->name = $request->name;
        $agenda->email = $request->email;
        $agenda->endereco = $request->endereco;
        $agenda->telefone = $request->telefone;
        return $agenda->save();
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        return Agenda::find($id);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $agenda = Agenda::find($id);
        $agenda->name = $request->name;
        $agenda->email = $request->email;
        $agenda->endereco = $request->endereco;
        $agenda->telefone = $request->telefone;
        return $agenda->save();
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $agenda = Agenda::find($id);
        return $agenda->delete();
    }
}
