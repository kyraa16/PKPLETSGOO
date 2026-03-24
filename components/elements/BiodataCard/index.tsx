import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";


export interface Biodata {
  id: string;
  namaLengkap: string;
  ttl: string;
  alamat: string;
  jurusan: string;
  angkatan: string;
  mbti?: string;
  makananFav?: string;
  hobi?: string;
  statusTinggal?: string;
  notes?: string;
}


interface BiodataCardProps {
  data: Biodata;
}


export const BiodataCard = ({ data }: BiodataCardProps) => {
  const initials = data.namaLengkap
    .split(" ")
    .map((n) => n[0])
    .join("")
    .substring(0, 2)
    .toUpperCase();


  return (
    <Card className="w-full max-w-md">
      <CardHeader className="flex flex-row items-center gap-4 pb-2">
        <Avatar className="w-16 h-16">
          <AvatarImage
            src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${data.namaLengkap}`}
            alt={data.namaLengkap}
          />
          <AvatarFallback>{initials}</AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <CardTitle className="text-xl">{data.namaLengkap}</CardTitle>
          <CardDescription>
            <Badge variant="secondary" className="mt-1">
              {data.jurusan}
            </Badge>
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="mt-4 text-sm text-muted-foreground space-y-2">
        <div className="grid grid-cols-3">
          <span className="font-semibold text-foreground">TTL</span>
          <span className="col-span-2">: {data.ttl}</span>
        </div>
        <div className="grid grid-cols-3">
          <span className="font-semibold text-foreground">Domisili</span>
          <span className="col-span-2">: {data.alamat}</span>
        </div>
        <div className="grid grid-cols-3">
          <span className="font-semibold text-foreground">Angkatan</span>
          <span className="col-span-2">: {data.angkatan}</span>
        </div>


        {data.mbti && (
          <>
            <hr className="my-2" />
            <div className="grid grid-cols-3">
              <span className="font-semibold text-foreground">MBTI</span>
              <span className="col-span-2">: {data.mbti}</span>
            </div>
            <div className="grid grid-cols-3">
              <span className="font-semibold text-foreground">Hobi</span>
              <span className="col-span-2">: {data.hobi}</span>
            </div>
            <div className="grid grid-cols-3">
              <span className="font-semibold text-foreground">Favorit</span>
              <span className="col-span-2">: {data.makananFav}</span>
            </div>
            <div className="grid grid-cols-3">
              <span className="font-semibold text-foreground">Status</span>
              <span className="col-span-2">: {data.statusTinggal}</span>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
};