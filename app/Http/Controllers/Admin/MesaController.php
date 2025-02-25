<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Mesa;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;
use SimpleSoftwareIO\QrCode\Facades\QrCode;
use Illuminate\Support\Facades\Storage;

class MesaController extends Controller
{
    public function create(Request $request)
    {
        $validated = $request->validate([
            'estabelecimento_id' => 'required|exists:estabelecimentos,id',
        ]);

        // Obtém o último número da mesa
        $ultimoNumero = Mesa::where('estabelecimento_id', $validated['estabelecimento_id'])
            ->max('numero') ?? 0;

        $novoNumero = $ultimoNumero + 1;

        // Gera o QR Code com GD como backend
        $qrCodeData = '';
        try {
            $qrCodeUrl = url("/mesa/$novoNumero");
            $qrCodeData = QrCode::format('svg')
            ->size(300)
                ->generate($qrCodeUrl);
        } catch (\Exception $e) {
            Log::error('Erro ao gerar QR Code: ' . $e->getMessage());
        }

        // Salva a imagem no disco
        $qrCodePath = "qrcodes/mesa_$novoNumero.svg";
        Storage::disk('public')->put($qrCodePath, $qrCodeData);

        // Cria a mesa
        $mesa = Mesa::create([
            'estabelecimento_id' => $validated['estabelecimento_id'],
            'numero' => $novoNumero,
            'qr_code_path' => $qrCodePath,
        ]);

        return response()->json([
            'message' => 'Mesa criada com sucesso!',
            'mesa' => $mesa,
            'qr_code_url' => asset("storage/$qrCodePath")
        ]);
    }
    public function indexApi()
    {
        $mesas = Mesa::with('estabelecimento')->get(); // Inclui o relacionamento se necessário

        // Renderiza o componente com Inertia
        return Inertia::render('Admin/Estabelecimento/IndexMesas', [
            'mesas' => $mesas
        ]);
    }


    public function show($id)
    {
        $mesas = Mesa::all(); // Certifique-se de que isto retorna um array
        return response()->json($mesas);
    }
    public function downloadQrCode($mesaId)
    {
        $mesa = Mesa::findOrFail($mesaId);

        // Caminho do QR Code no storage público
        $qrCodePath = "qrcodes/mesa_{$mesa->numero}.png";

        if (Storage::disk('public')->exists($qrCodePath)) {
            return response()->download(storage_path("app/public/{$qrCodePath}"));
        }

        return response()->json(['error' => 'QR Code não encontrado.'], 404);
    }

}
