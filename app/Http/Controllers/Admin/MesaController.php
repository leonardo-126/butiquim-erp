<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Mesa;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;
use SimpleSoftwareIO\QrCode\Facades\QrCode;
use Illuminate\Support\Facades\Storage;
use SebastianBergmann\CodeCoverage\Test\TestStatus\Success;

use function PHPUnit\Framework\fileExists;

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

        // Caminho para salvar o QR Code diretamente na pasta `public/qrcodes`
        $qrCodePath = "qrcodes/mesa_$novoNumero.svg";
        $qrCodeFullPath = public_path($qrCodePath);

        // Certifique-se de que a pasta existe
        if (!file_exists(public_path('qrcodes'))) {
            mkdir(public_path('qrcodes'), 0777, true);
        }

        // Salva a imagem no diretório `public/qrcodes`
        file_put_contents($qrCodeFullPath, $qrCodeData);

        // Cria a mesa no banco de dados
        $mesa = Mesa::create([
            'estabelecimento_id' => $validated['estabelecimento_id'],
            'numero' => $novoNumero,
            'qr_code_path' => $qrCodePath, // Apenas o caminho relativo dentro de `public`
        ]);

        return response()->json([
            'message' => 'Mesa criada com sucesso!',
            'mesa' => $mesa,
            'qr_code_url' => asset($qrCodePath) // Retorna a URL acessível
        ]);
    }
    public function indexApi()
    {
        $mesas = Mesa::all()->map(function ($mesa) {
            return [
                'id' => $mesa->id,
                'numero' => $mesa->numero,
                'qr_code_url' => asset($mesa->qr_code_path),
            ];
        });
    
        return response()->json(['data' => $mesas]);
    }


    public function show($id)
    {
        $mesas = Mesa::with('estabelecimento')->get(); // Inclui o relacionamento se necessário

        // Renderiza o componente com Inertia
        return response()->json([
            'success' => true,
            'data' => $mesas
        ]);
    }
    public function downloadQrCode($mesaId)
    {
        $mesa = Mesa::findOrFail($mesaId);
        $qrCodePath = public_path("qrcodes/mesa_{$mesa->numero}.png");

        if (file_exists($qrCodePath)) {
            return response()->download($qrCodePath);
        }

        return response()->json(['error' => 'QR Code não encontrado.'], 404);
    }

    public function destroy($mesaId) {
        $mesa = Mesa::find($mesaId);
        if(!$mesa) {
            return response()->json(['error' => 'Mesa não encontrada'], 404);
        }
        //remover o qrcode
        if($mesa->qr_code_path && fileExists(public_path($mesa->qr_code_path))) {
            unlink(public_path($mesa->qr_code_path));
        }

        $mesa->delete();

        return response()->json(['message'=> 'Mesa excluida com sucesso!']);
        
    }

}
