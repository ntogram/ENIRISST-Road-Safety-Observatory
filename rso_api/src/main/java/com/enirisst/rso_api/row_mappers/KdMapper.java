package com.enirisst.rso_api.row_mappers;

import com.enirisst.rso_api.models.Kd;
import com.enirisst.rso_api.models.Nut2;
import org.springframework.jdbc.core.RowMapper;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.sql.ResultSet;
import java.sql.SQLException;

import static java.lang.Math.round;

public class KdMapper implements RowMapper<Kd>
{
    private int dec=1;
    private boolean rounded=true;


    public KdMapper(boolean rounded,int dec) {
        this.dec=dec;
        this.rounded = rounded;
    }

    public KdMapper() {
    }

    @Override
    public Kd mapRow(ResultSet rs, int rowNum) throws SQLException {
        if (this.rounded==false){
            // double d=Double.valueOf(df.format(rs.getDouble("indicator")));
            BigDecimal bd = new BigDecimal(rs.getDouble("indicator")).setScale(dec, RoundingMode.HALF_UP);
            double ind=bd.doubleValue();
            return new Kd(rs.getString("Code"),rs.getString("Muname"),rs.getInt("YEAR_ID"),ind);
        }



        return new Kd(rs.getString("Code"),rs.getString("Muname"),rs.getInt("YEAR_ID"),round(rs.getDouble("indicator")));
    }
}
