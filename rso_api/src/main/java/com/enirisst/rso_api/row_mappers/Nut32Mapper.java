package com.enirisst.rso_api.row_mappers;
import com.enirisst.rso_api.models.Nut32;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

public class Nut32Mapper implements  RowMapper<Nut32>  {
    @Override
    public Nut32 mapRow(ResultSet rs, int rowNum) throws SQLException {

        return new Nut32(rs.getString("eu_code"),rs.getString("nut"),rs.getInt("YEAR_ID"),rs.getInt("count"),rs.getString("unemployment"),rs.getString("indicator"));
    }
}
